import { useDemoTrucoSetup } from './demoTrucoSetup';

describe('useDemoTrucoSetup', () => {
  it('first player is always to the left of the dealer (dealer always AI 2 in demo)', () => {
    const playerHand = [
      { value: '4', suit: 'Clubs' },
      { value: '7', suit: 'Hearts' },
      { value: '3', suit: 'Clubs' },
    ];
    // Dealer is always seat 3 (AI 2) in demo
    const players = useDemoTrucoSetup(playerHand, 3);
    const firstPlayerSeat = 0; // (3 + 1) % 4
    expect(players[firstPlayerSeat].isActive).toBe(true);
    for (let i = 0; i < 4; i++) {
      if (i !== firstPlayerSeat) expect(players[i].isActive).toBe(false);
    }
  });

  it('dealer is always AI 2 (seat 3) in demo', () => {
    const playerHand = [
      { value: '4', suit: 'Clubs' },
      { value: '7', suit: 'Hearts' },
      { value: '3', suit: 'Clubs' },
    ];
    const players = useDemoTrucoSetup(playerHand, 0);
    expect(players[3].isDealer).toBe(true);
    for (let i = 0; i < 3; i++) {
      expect(players[i].isDealer).toBe(false);
    }
  });

  it('AI hand sizes are correct', () => {
    const playerHand = [
      { value: '4', suit: 'Clubs' }
    ];
    const aiHandSizes = [2, 1, 3];
    const players = useDemoTrucoSetup(playerHand, 3, aiHandSizes);
    expect(players[1].hand.length).toBe(2);
    expect(players[2].hand.length).toBe(1);
    expect(players[3].hand.length).toBe(3);
  });
});
