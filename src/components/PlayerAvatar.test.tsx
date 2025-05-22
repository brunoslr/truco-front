import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PlayerAvatar from './PlayerAvatar';

describe('PlayerAvatar', () => {
  const hand = [
    { value: '4', suit: 'Clubs' },
    { value: '7', suit: 'Hearts' },
    { value: '3', suit: 'Clubs' },
  ];

  it('renders player name, team indicator, and hand', () => {
    const { getByText } = render(
      <PlayerAvatar
        playerName="Test Player"
        teamIndicator="blue"
        hand={hand}
        onTruco={jest.fn()}
        onRaise={jest.fn()}
        onFold={jest.fn()}
        isTrucoCalled={false}
        isRaiseEnabled={true}
      />
    );
    expect(getByText('Test Player')).toBeInTheDocument();
    expect(getByText('4')).toBeInTheDocument();
    expect(getByText('7')).toBeInTheDocument();
    expect(getByText('Hearts')).toBeInTheDocument();
  });

  it('calls onTruco, onRaise, and onFold when buttons are clicked', () => {
    const onTruco = jest.fn();
    const onRaise = jest.fn();
    const onFold = jest.fn();
    const { getByText, rerender } = render(
      <PlayerAvatar
        playerName="Test Player"
        teamIndicator="blue"
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
        playerName="Test Player"
        teamIndicator="blue"
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
