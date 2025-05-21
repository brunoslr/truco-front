import { Card } from '../models/Card';

export const getMockPlayerHand = (): Card[] => {
  return [
    { rank: '4', suit: 'Clubs' },
    { rank: '7', suit: 'Hearts' },
    { rank: 'Ace', suit: 'Spades' },
    { rank: '7', suit: 'Diamonds' },
    { rank: '3', suit: 'Clubs' },
  ];
};