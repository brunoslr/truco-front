// Demo setup for Truco game integration and development

export function useDemoTrucoSetup(playerHand: { value: string; suit: string }[], _dealerSeat: number, aiHandSizes?: number[]) {
  // For demo: Dealer is always AI 2 (seat 3)
  const dealerSeat = 3;
  // The first player is always the one to the left of the dealer
  // Seat order: 0 = You, 1 = AI 1, 2 = Partner, 3 = AI 2
  // Dealer is seat dealerSeat, first player is (dealerSeat + 1) % 4
  const firstPlayerSeat = (dealerSeat + 1) % 4;
  // aiHandSizes: [ai1, partner, ai2] (optional, for dynamic deduction)
  const ai1Hand = aiHandSizes ? aiHandSizes[0] : 3;
  const partnerHand = aiHandSizes ? aiHandSizes[1] : 3;
  const ai2Hand = aiHandSizes ? aiHandSizes[2] : 3;
  const hands = [
    playerHand,
    Array(ai1Hand).fill({ value: '', suit: '' }),
    Array(partnerHand).fill({ value: '', suit: '' }),
    Array(ai2Hand).fill({ value: '', suit: '' })
  ];
  const players = [0, 1, 2, 3].map(seat => ({
    name: seat === 0 ? 'You' : seat === 1 ? 'AI 1' : seat === 2 ? 'Partner' : 'AI 2',
    team: seat === 0 || seat === 2 ? "Player's Team" as const : 'Opponent Team' as const,
    hand: hands[seat],
    isDealer: seat === dealerSeat,
    isActive: seat === firstPlayerSeat,
    // For tests: expose seat and firstPlayerSeat for debugging
    seat,
    firstPlayerSeat
  }));
  return players;
}
