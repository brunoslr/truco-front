// Mock backend for all game-related services (actions, hand winners, player hand, etc.)
export interface HandResult {
  handNumber: number;
  winner: string; // e.g., 'Player', 'AI', 'Team 1', etc.
}

export type ActionLogEntry =
  | { type: 'card-played'; player: string; card: string }
  | { type: 'button-pressed'; player: string; action: 'truco' | 'raise' | 'fold' }
  | { type: 'hand-result'; handNumber: number; winner: string };

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
// ...add other mock services here as needed...
