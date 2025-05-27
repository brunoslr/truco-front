// Mock backend for all game-related services (actions, hand winners, player hand, etc.)
export interface HandResult {
  handNumber: number;
  winner: string; // e.g., 'Player', 'AI', 'Team 1', etc.
}

export type ActionLogEntry =
  | { type: 'card-played'; player: string; card: string }
  | { type: 'button-pressed'; player: string; action: 'truco' | 'raise' | 'fold' }
  | { type: 'hand-result'; handNumber: number; winner: string }
  | { type: 'turn-result'; winnerTeam: "Player's Team" | "Opponent Team" };

export function getMockGameActions(): ActionLogEntry[] {
  return [
    { type: 'card-played', player: 'Player', card: '4 of Clubs' },
    { type: 'card-played', player: 'AI', card: '7 of Hearts' },
    { type: 'button-pressed', player: 'Player', action: 'truco' },
    { type: 'button-pressed', player: 'AI', action: 'raise' },
    { type: 'button-pressed', player: 'Player', action: 'fold' },
    { type: 'hand-result', handNumber: 1, winner: 'Player' },
    { type: 'card-played', player: 'AI', card: '3 of Clubs' },
    { type: 'card-played', player: 'Player', card: '7 of Diamonds' },
    { type: 'hand-result', handNumber: 2, winner: 'AI' },
  ];
}

export function getMockHandResults(): HandResult[] {
  return [
    { handNumber: 1, winner: 'Player' },
    { handNumber: 2, winner: 'AI' },
  ];
}

// Returns a mock AI move: { seat, card } for the next AI to play
export function getMockAIMove(playedCards: { playerName: string; card: { value: string; suit: string } | null }[], aiHands: { [seat: number]: { value: string; suit: string }[] }) {
  // Find the next AI seat (1 or 3) with an empty slot
  const aiSeats = [1, 3, 2]; // 1 and 3 are opponents, 2 is partner (simulate partner as AI for now)
  for (const seat of aiSeats) {
    if (!playedCards[seat].card && aiHands[seat] && aiHands[seat].length > 0) {
      // Play the first card in the AI's hand
      const [card] = aiHands[seat];
      return {
        seat,
        card,
      };
    }
  }
  return { seat: null, card: null };
}

// Returns the winner of the current turn (mock logic: random or highest value)
export function getMockTurnWinner(playedCards: { playerName: string; card: { value: string; suit: string } | null }[]) {
  // For demo, just alternate between teams or pick the first non-null
  const played = playedCards.filter(slot => slot.card);
  if (played.length < 4) return null;
  // Alternate winner for demo
  const winnerTeam = Math.random() > 0.5 ? "Player's Team" : "Opponent Team";
  return winnerTeam;
}
