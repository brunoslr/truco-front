import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PlayerAvatar from './PlayerAvatar';

describe('PlayerAvatar', () => {
  const hand = [
    { value: '4', suit: 'Clubs' },
    { value: '7', suit: 'Hearts' },
    { value: '3', suit: 'Clubs' },
  ];

  it('renders player name, team indicator, and hand (face up for player)', () => {
    const { getByText } = render(
      <PlayerAvatar
        playerName="You"
        teamIndicator="Player's Team"
        hand={hand}
        onTruco={jest.fn()}
        onRaise={jest.fn()}
        onFold={jest.fn()}
        isTrucoCalled={false}
        isRaiseEnabled={true}
      />
    );
    expect(getByText('You')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('7')).toBeInTheDocument();
    expect(getByText('Hearts')).toBeInTheDocument();
  });

  it('renders cardbacks for non-player hands', () => {
    const { getAllByLabelText, queryByText } = render(
      <PlayerAvatar
        playerName="AI 1"
        teamIndicator="Opponent Team"
        hand={hand}
        onTruco={jest.fn()}
        onRaise={jest.fn()}
        onFold={jest.fn()}
        isTrucoCalled={false}
        isRaiseEnabled={true}
      />
    );
    // Should render 3 cardbacks
    expect(getAllByLabelText('card back').length).toBe(3);
    // Should NOT render card values or suits
    expect(queryByText('4')).not.toBeInTheDocument();
    expect(queryByText('7')).not.toBeInTheDocument();
    expect(queryByText('Hearts')).not.toBeInTheDocument();
  });

  it('calls onTruco, onRaise, and onFold when buttons are clicked', () => {
    const onTruco = jest.fn();
    const onRaise = jest.fn();
    const onFold = jest.fn();
    const { getByText, rerender } = render(
      <PlayerAvatar
        playerName="You"
        teamIndicator="Player's Team"
        hand={hand}
        onTruco={onTruco}
        onRaise={onRaise}
        onFold={onFold}
        isTrucoCalled={false}
        isRaiseEnabled={true}
      />
    );
    fireEvent.click(getByText('Truco!'));
    expect(onTruco).toHaveBeenCalled();

    rerender(
      <PlayerAvatar
        playerName="You"
        teamIndicator="Player's Team"
        hand={hand}
        onTruco={onTruco}
        onRaise={onRaise}
        onFold={onFold}
        isTrucoCalled={true}
        isRaiseEnabled={true}
      />
    );
    fireEvent.click(getByText('Raise'));
    expect(onRaise).toHaveBeenCalled();

    fireEvent.click(getByText('Fold'));
    expect(onFold).toHaveBeenCalled();
  });
});
