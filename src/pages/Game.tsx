import React, { useEffect, useState } from 'react';
import apiConfig from '../config/apiConfig';
import GameRound from '../components/GameRound';

const Game: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [playerSeat, setPlayerSeat] = useState<number>(0);
  const [players, setPlayers] = useState<any[]>([]);
  const [playedCards, setPlayedCards] = useState<any[]>([]);
  const [stakes, setStakes] = useState(2);
  const [isTrucoCalled, setIsTrucoCalled] = useState(false);
  const [isRaiseEnabled, setIsRaiseEnabled] = useState(false);
  const [currentHand, setCurrentHand] = useState(1);
  const [teamScores, setTeamScores] = useState<{ [team: string]: number }>({});
  const [turnWinner, setTurnWinner] = useState<string | null>(null);
  const [actions, setActions] = useState<any[]>([]);
  const [activeSeat, setActiveSeat] = useState<number>(0);
  const [playerHand, setPlayerHand] = useState<any[]>([]);

  const fetchGameState = async (gid: string, seat?: number) => {
    const url = seat !== undefined ? `${apiConfig.API_BASE}/${gid}?playerSeat=${seat}` : `${apiConfig.API_BASE}/${gid}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch game state');
    return await res.json();
  };

  useEffect(() => {
    if (!gameId) {
      fetch(`${apiConfig.API_BASE}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerName: 'Player' }),
      })
        .then(res => res.json())        .then(data => {
          setGameId(data.gameId);
          setPlayerSeat(data.playerSeat || 0);
          
          // Handle initial game state from start response
          if (data.players) {
            const processedPlayers = data.players.map((player: any, index: number) => {
              const isCurrentPlayer = player.seat === (data.playerSeat || 0);
              
              let playerHand = [];
              if (isCurrentPlayer && data.hand) {
                // Current player: use hand from start response
                playerHand = data.hand;
              } else {
                // Other players: show card backs as placeholder
                playerHand = [
                  { value: '', suit: '' },
                  { value: '', suit: '' },
                  { value: '', suit: '' }
                ];
              }
              
              return {
                ...player,
                name: isCurrentPlayer ? 'You' : player.name || `Player ${index + 1}`,
                hand: playerHand,
                seat: player.seat
              };
            });
            
            setPlayers(processedPlayers);
            setPlayerHand(data.hand || []);
            setTeamScores(data.teamScores || {});
            setStakes(data.stakes || 2);
            setCurrentHand(data.currentHand || 1);
          }
        });
    }
  }, [gameId]);  useEffect(() => {
    if (!gameId) return;
    let cancelled = false;
    let retryDelay = 1500; // Start with 1.5s
    const maxDelay = 30000; // Max 30s

    const poll = async () => {
      try {
        const state = await fetchGameState(gameId, playerSeat);        if (!cancelled) {
          // Process players and mark the current player
          const processedPlayers = (state.players || []).map((player: any, index: number) => {
            const isCurrentPlayer = player.seat === playerSeat;
            
            let playerHand = [];
            
            if (isCurrentPlayer) {
              // Current player: use player.hand from the backend
              playerHand = player.hand || [];
            } else {
              // Other players: show their cards if available, otherwise show card backs
              if (player.hand && player.hand.length > 0) {
                // For other players, show their actual cards (backend provides them)
                playerHand = player.hand;
              } else {
                // Show 3 card backs as placeholder
                playerHand = [
                  { value: '', suit: '' },
                  { value: '', suit: '' },
                  { value: '', suit: '' }
                ];
              }
            }
            
            return {
              ...player,
              name: isCurrentPlayer ? 'You' : player.name || `Player ${index + 1}`,
              hand: playerHand,
              seat: player.seat // Make sure seat is preserved
            };          });
          
          setPlayers(processedPlayers);
          setPlayedCards(state.playedCards || []);
          setStakes(state.stakes || 2);
          setIsTrucoCalled(state.isTrucoCalled || false);
          setIsRaiseEnabled(state.isRaiseEnabled || false);
          setCurrentHand(state.currentHand || 1);
          setTeamScores(state.teamScores || {});          setTurnWinner(state.turnWinner || null);
          setActions(state.actionLog || []);
          
          // Set current player's hand - find it from the processed players
          const currentPlayer = processedPlayers.find((p: any) => p.seat === playerSeat);
          setPlayerHand(currentPlayer?.hand || []);
          
          // Find active player seat
          const activeSeatIndex = state.players?.findIndex((p: any) => p.isActive) ?? 0;
          setActiveSeat(activeSeatIndex >= 0 ? activeSeatIndex : 0);
          
          retryDelay = 1500; // Reset delay on success
        }
      } catch (e) {
        console.error('Failed to fetch game state:', e);
        retryDelay = Math.min(retryDelay * 2, maxDelay); // Exponential backoff
      }
      if (!cancelled) setTimeout(poll, retryDelay);
    };
    poll();
    return () => { cancelled = true; };
  }, [gameId, playerSeat]);

  const playCard = async (cardIdx: number) => {
    if (activeSeat !== playerSeat || !playerHand[cardIdx] || !gameId) return;
    const card = playerHand[cardIdx];
    await fetch(`${apiConfig.API_BASE}/play-card`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerSeat, card, gameId }),
    });
  };

  const onTruco = async () => {
    if (!gameId) return;
    await fetch(`${apiConfig.API_BASE}/press-button`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerSeat, action: 'truco', gameId }),
    });
  };
  
  const onRaise = async () => {
    if (!gameId) return;
    await fetch(`${apiConfig.API_BASE}/press-button`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerSeat, action: 'raise', gameId }),
    });
  };
  
  const onFold = async () => {
    if (!gameId) return;
    await fetch(`${apiConfig.API_BASE}/press-button`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerSeat, action: 'fold', gameId }),
    });
  };
  // Ensure teamScores always has both keys for GameRound
  const safeTeamScores = {
    "Player's Team": teamScores["Player's Team"] ?? 0,
    "Opponent Team": teamScores["Opponent Team"] ?? 0,
  };

  // Arrange players for UI - put current player at bottom (index 0)
  const arrangePlayersForUI = (players: any[], currentPlayerSeat: number) => {
    if (players.length !== 4) return players;
    
    const arranged = new Array(4);
    // Current player goes to bottom (index 0)
    arranged[0] = players[currentPlayerSeat];
    
    // Arrange other players clockwise from current player
    for (let i = 1; i < 4; i++) {
      const seatIndex = (currentPlayerSeat + i) % 4;
      arranged[i] = players[seatIndex];
    }
    
    return arranged;
  };
  const arrangedPlayers = arrangePlayersForUI(players, playerSeat);
  
  return (
    <div style={{ padding: 20 }}>
      <h2>Game Page</h2>      <p>Game ID: {gameId}</p>
      <p>Player Seat: {playerSeat}</p>
      <p>Players: {players.length}</p>
      <p>Your Hand: {playerHand.length} cards</p>
      {playerHand.length > 0 && (
        <div style={{ marginBottom: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 }}>
          <strong>Your Cards:</strong>
          <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
            {playerHand.map((card: any, index: number) => (
              <div key={index} style={{ 
                padding: '5px 10px', 
                backgroundColor: 'white', 
                border: '1px solid #ccc', 
                borderRadius: 3,
                fontSize: 12
              }}>
                {card.value} of {card.suit}
              </div>
            ))}
          </div>
        </div>
      )}
        {arrangedPlayers.length > 0 && (
        <GameRound
          players={arrangedPlayers}
          playedCards={playedCards}
          stakes={stakes}
          actions={actions}
          onTruco={onTruco}
          onRaise={onRaise}
          onFold={onFold}
          isTrucoCalled={isTrucoCalled}
          isRaiseEnabled={isRaiseEnabled}
          currentHand={currentHand}
          teamScores={safeTeamScores}
          turnWinner={turnWinner as "Player's Team" | "Opponent Team" | undefined}
          onPlayCard={playCard}
          activeSeat={activeSeat}
        />
      )}
    </div>
  );
};

export default Game;
