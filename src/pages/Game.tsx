import React, { useState } from 'react';
import GameRound from '../components/GameRound';
import { usePlayerHand } from '../services/playerHandProvider';
import { getMockGameActions, getMockAIMove, getMockTurnWinner } from '../services/mockGameActions';
import { useDemoTrucoSetup } from './demoTrucoSetup';
import type { ActionLogEntry } from '../services/mockGameActions';

// Helper type for playedCardsState
interface PlayedCardSlot {
  playerName: string;
  card: { value: string; suit: string } | null;
}

const Game: React.FC = () => {
  const initialCards = usePlayerHand();
  // Stakes start at 2, Truco sets to 4, each raise +4, max 12
  const [stakes, setStakes] = useState(2);
  // Use mock actions for now
  const [actions, setActions] = useState<ActionLogEntry[]>(getMockGameActions());

  // Track whose turn it is (seat number, 0 = You)
  const [activeSeat, setActiveSeat] = useState(1); // Dealer is 0, so first to play is 1 (counter-clockwise)

  // Play a card (frontend simulation for now)
  const [playerHand, setPlayerHand] = useState(initialCards);
  const [playedCardsState, setPlayedCardsState] = useState<PlayedCardSlot[]>([
    { playerName: 'You', card: null },
    { playerName: 'AI 1', card: null },
    { playerName: 'Partner', card: null },
    { playerName: 'AI 2', card: null },
  ]);

  // Track dealer seat (always set to 3 for AI 2)
  const dealerSeat = 3;

  // Calculate AI hand sizes based on cards played
  const aiHandSizes = [
    3 - (playedCardsState[1].card ? 1 : 0),
    3 - (playedCardsState[2].card ? 1 : 0),
    3 - (playedCardsState[3].card ? 1 : 0),
  ];

  // Demo data for GameRound integration
  const players = useDemoTrucoSetup(playerHand, dealerSeat, aiHandSizes);
  const teamScores = { "Player's Team": 6, 'Opponent Team': 4 };
  const currentHand = 1;

  // State for button logic
  const [isTrucoCalled, setIsTrucoCalled] = useState(false);
  // For now, raise is always enabled when Truco is called and stakes < 12
  const isRaiseEnabled = isTrucoCalled && stakes < 12;

  const [turnWinner, setTurnWinner] = useState<string | null>(null);
  const [turnNumber, setTurnNumber] = useState(1);
  const [handOver, setHandOver] = useState(false);

  // Simulate sending play-card payload to backend (log for demo)
  const sendPlayCardPayload = (playerId: string, card?: { value: string; suit: string } | null) => {
    let payload;
    if (card === undefined) {
      // AI move: only playerId
      payload = { playerId };
    } else if (card && card.value === '0' && card.suit === '') {
      // Fold
      payload = { playerId, card: { value: 0, suit: "" } };
    } else {
      // Human play
      payload = { playerId, card };
    }
    // For now, just log the payload (replace with real API call in production)
    // eslint-disable-next-line no-console
    console.log('[MOCK API] POST /api/game/play-card', payload);
  };

  const onTruco = () => {
    setStakes((prev) => {
      if (prev < 4) return 4;
      if (prev < 12) return Math.min(prev + 4, 12);
      return prev;
    });
    setActions((prev) => [
      ...prev,
      { type: 'button-pressed', player: 'Player', action: 'truco' }
    ]);
    setIsTrucoCalled(true);
  };

  const onRaise = () => {
    setStakes((prev) => (prev < 12 ? Math.min(prev + 4, 12) : prev));
    setActions((prev) => [
      ...prev,
      { type: 'button-pressed', player: 'Player', action: 'raise' }
    ]);
  };

  const onFold = () => {
    sendPlayCardPayload('You', { value: '0', suit: '' }); // Fold
    setActions((prev) => [
      ...prev,
      { type: 'button-pressed', player: 'Player', action: 'fold' }
    ]);
    // Reset round state for demonstration
    setIsTrucoCalled(false);
    setStakes(2);
  };

  const checkTurnEnd = (newPlayedCards: PlayedCardSlot[]) => {
    // If all 4 cards are played, determine winner
    if (newPlayedCards.every(slot => slot.card)) {
      const winnerTeam = getMockTurnWinner(newPlayedCards);
      if (!winnerTeam) return;
      setTurnWinner(winnerTeam);
      setActions(prev => [
        ...prev,
        { type: 'turn-result', winnerTeam: winnerTeam },
      ]);
      // After a short delay, clear the play area for next turn or reset hand
      setTimeout(() => {
        setTurnWinner(null);
        setTurnNumber(tn => tn + 1);
        // If 3 turns played, reset hand (simulate end of hand)
        if (turnNumber >= 3) {
          setHandOver(true);
          // Reset everything for new hand (demo logic)
          setTimeout(() => {
            setPlayerHand(initialCards);
            setPlayedCardsState([
              { playerName: 'You', card: null },
              { playerName: 'AI 1', card: null },
              { playerName: 'Partner', card: null },
              { playerName: 'AI 2', card: null },
            ]);
            setTurnNumber(1);
            setHandOver(false);
            // Do NOT reset teamScores here; only reset hands/cards
          }, 1500);
        } else {
          setPlayedCardsState([
            { playerName: 'You', card: null },
            { playerName: 'AI 1', card: null },
            { playerName: 'Partner', card: null },
            { playerName: 'AI 2', card: null },
          ]);
        }
      }, 1200);
    }
  };

  // Simulate AI move (mock API)
  const aiMove = () => {
    // For demo, AI hands are empty, but in a real game, pass AI hands as second arg
    const aiHands = {
      1: [], // AI 1 hand
      2: [], // Partner hand (if AI)
      3: [], // AI 2 hand
    };
    const { seat, card } = getMockAIMove(playedCardsState, aiHands);
    if (!card) return;
    sendPlayCardPayload(players[seat].name, undefined); // AI move: only playerId
    // Update playedCards for AI
    const newPlayedCards: PlayedCardSlot[] = playedCardsState.map((slot, idx) =>
      idx === seat ? { playerName: slot.playerName, card } : { playerName: slot.playerName, card: slot.card }
    );
    setPlayedCardsState(newPlayedCards);
    // Add to action log
    setActions(prev => [
      ...prev,
      { type: 'card-played', player: players[seat].name, card: `${card.value} of ${card.suit}` }
    ]);
    // Advance turn counter-clockwise
    setActiveSeat((prev) => (prev + 3) % 4);
    checkTurnEnd(newPlayedCards);
  };

  // DEV ONLY: Button to force a random AI play for demo/testing
  const devForceAIMove = () => {
    // Pick a random AI seat that hasn't played yet and has cards left
    const aiSeats = [1, 2, 3];
    const available = aiSeats.filter(seat => !playedCardsState[seat].card);
    if (available.length === 0) return;
    const seat = available[Math.floor(Math.random() * available.length)];
    // Simulate a random card (for demo)
    const card = { value: String(Math.floor(Math.random() * 10) + 1), suit: ['Clubs', 'Hearts', 'Spades', 'Diamonds'][Math.floor(Math.random() * 4)] };
    // Build new playedCardsState with correct types
    const newPlayedCards: PlayedCardSlot[] = playedCardsState.map((slot, idx) =>
      idx === seat ? { playerName: slot.playerName, card } : { playerName: slot.playerName, card: slot.card }
    );
    setPlayedCardsState(newPlayedCards);
    setActions(prev => [
      ...prev,
      { type: 'card-played', player: players[seat].name, card: `${card.value} of ${card.suit}` }
    ]);
    setActiveSeat((prev) => (prev + 3) % 4);
    checkTurnEnd(newPlayedCards);
  };

  const playCard = (cardIdx: number) => {
    // Only allow if it's the player's turn (activeSeat === 0)
    if (activeSeat !== 0 || !playerHand[cardIdx]) return;
    const card = playerHand[cardIdx];
    sendPlayCardPayload('You', card); // Human play
    // Remove card from player's hand
    const newHand = playerHand.filter((_, idx) => idx !== cardIdx);
    setPlayerHand(newHand);
    // Update playedCards table for the player
    const newPlayedCards: PlayedCardSlot[] = playedCardsState.map(slot =>
      slot.playerName === 'You' ? { playerName: slot.playerName, card } : { playerName: slot.playerName, card: slot.card }
    );
    setPlayedCardsState(newPlayedCards);
    // Add to action log
    setActions(prev => [
      ...prev,
      { type: 'card-played', player: 'You', card: `${card.value} of ${card.suit}` }
    ]);
    // Advance turn counter-clockwise: (activeSeat + 3) % 4
    setActiveSeat((prev) => (prev + 3) % 4);
    checkTurnEnd(newPlayedCards);
    // Simulate AI move after a short delay if it's now an AI's turn
    setTimeout(() => {
      if (activeSeat !== 0) aiMove();
    }, 500);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Game Page</h2>
      <button style={{ marginBottom: 12, background: '#ffe066', color: '#7a5c00', fontWeight: 'bold', border: '1px solid #c9a227', borderRadius: 6, padding: '6px 18px', cursor: 'pointer' }} onClick={devForceAIMove}>
        DEV: Force Random AI Play
      </button>
      <GameRound
        players={players}
        playedCards={playedCardsState}
        stakes={stakes}
        actions={actions}
        onTruco={onTruco}
        onRaise={onRaise}
        onFold={onFold}
        isTrucoCalled={isTrucoCalled}
        isRaiseEnabled={isRaiseEnabled}
        currentHand={currentHand}
        teamScores={teamScores}
        turnWinner={turnWinner as "Player's Team" | "Opponent Team" | undefined}
        onPlayCard={playCard}
        activeSeat={activeSeat}
      />
    </div>
  );
};

export default Game;
