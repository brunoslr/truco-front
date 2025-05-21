import type { Card } from '../models/Card';

export const getMockPlayerHand = (): Card[] => {
  return [
    { rank: '4', suit: 'Clubs' },
    { rank: '7', suit: 'Hearts' },
    { rank: '3', suit: 'Clubs' },
  ];
};