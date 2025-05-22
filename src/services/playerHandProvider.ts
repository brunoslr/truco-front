// Abstracts the source of the player's hand (mock or real API)
import { useMemo } from 'react';
import { getMockPlayerHand } from './mockBackend';

export function usePlayerHand() {
  // In the future, switch to real API here
  // For now, use the mock backend and map to CardProps
  return useMemo(() => getMockPlayerHand().map(card => ({ value: card.rank, suit: card.suit })), []);
}
