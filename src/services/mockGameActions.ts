// Mock backend for all game-related services (actions, hand winners, player hand, etc.)
export interface HandResult {
  handNumber: number;
  winner: string; // e.g., 'Player', 'AI', 'Team 1', etc.
}

export function getMockGameActions(): string[] {
  return [
    'Player played 4 of Clubs',
    'AI played 7 of Hearts',
    'Player called Truco',
    'AI accepted Truco',
    'Player won the hand',
    'AI played 3 of Clubs',
    'Player played 7 of Diamonds',
    'AI won the hand',
  ];
}

export function getMockHandResults(): HandResult[] {
  return [
    { handNumber: 1, winner: 'Player' },
    { handNumber: 2, winner: 'AI' },
  ];
}
// ...add other mock services here as needed...
