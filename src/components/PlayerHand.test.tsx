import React from 'react';
import { render } from '@testing-library/react';
import PlayerHand from './PlayerHand';

describe('PlayerHand', () => {
  it('renders with 3 cards face up', () => {
    const initialCards = [
      { suit: 'hearts', value: 'A' },
      { suit: 'spades', value: 'K' },
      { suit: 'diamonds', value: 'Q' },
    ];

    const { getAllByText } = render(
      <PlayerHand initialCards={initialCards} faceUp={true} alwaysShowBack={false} isActive={true} onPlayCard={jest.fn()} />
    );

    // Check that all card values and suits are rendered
    expect(getAllByText('A')[0]).toBeInTheDocument();
    expect(getAllByText('K')[0]).toBeInTheDocument();
    expect(getAllByText('Q')[0]).toBeInTheDocument();
    expect(getAllByText('hearts')[0]).toBeInTheDocument();
    expect(getAllByText('spades')[0]).toBeInTheDocument();
    expect(getAllByText('diamonds')[0]).toBeInTheDocument();
  });

  it('renders cardbacks for non-player hands (alwaysShowBack=true)', () => {
    const initialCards = [
      { suit: 'hearts', value: 'A' },
      { suit: 'spades', value: 'K' },
      { suit: 'diamonds', value: 'Q' },
    ];
    const { getAllByLabelText, queryByText } = render(
      <PlayerHand initialCards={initialCards} faceUp={false} alwaysShowBack={true} />
    );
    // Should render 3 cardbacks (emoji)
    expect(getAllByLabelText('card back').length).toBe(3);
    // Should NOT render card values or suits
    expect(queryByText('A')).not.toBeInTheDocument();
    expect(queryByText('K')).not.toBeInTheDocument();
    expect(queryByText('Q')).not.toBeInTheDocument();
    expect(queryByText('hearts')).not.toBeInTheDocument();
    expect(queryByText('spades')).not.toBeInTheDocument();
    expect(queryByText('diamonds')).not.toBeInTheDocument();
  });

  it('renders cardbacks when faceUp is false', () => {
    const initialCards = [
      { suit: 'hearts', value: 'A' },
      { suit: 'spades', value: 'K' },
    ];
    const { getAllByLabelText, queryByText } = render(
      <PlayerHand initialCards={initialCards} faceUp={false} />
    );
    expect(getAllByLabelText('card back').length).toBe(2);
    expect(queryByText('A')).not.toBeInTheDocument();
    expect(queryByText('K')).not.toBeInTheDocument();
  });
});