import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PlayerHand from './PlayerHand';

describe('PlayerHand', () => {
  it('renders with 3 cards and can play a card', () => {
    const initialCards = [
      { suit: 'hearts', value: 'A' },
      { suit: 'spades', value: 'K' },
      { suit: 'diamonds', value: 'Q' },
    ];

    const { getAllByText, queryByText } = render(<PlayerHand initialCards={initialCards} />);

    // Check that all card values are rendered initially
    expect(getAllByText('A')[0]).toBeInTheDocument();
    expect(getAllByText('K')[0]).toBeInTheDocument();
    expect(getAllByText('Q')[0]).toBeInTheDocument();
    expect(getAllByText('hearts')[0]).toBeInTheDocument();
    expect(getAllByText('spades')[0]).toBeInTheDocument();
    expect(getAllByText('diamonds')[0]).toBeInTheDocument();

    // Simulate playing a card (click the first card)
    const cardDiv = getAllByText('A')[0].closest('div');
    if (cardDiv) {
      fireEvent.click(cardDiv);
    }

    // Verify that the played card value is no longer rendered
    expect(queryByText('A')).not.toBeInTheDocument();
    // Verify that the remaining cards are still rendered
    expect(getAllByText('K')[0]).toBeInTheDocument();
    expect(getAllByText('Q')[0]).toBeInTheDocument();
  });

  it('adds a new card to the hand', () => {
    const initialCards = [
      { suit: 'hearts', value: 'A' },
      { suit: 'spades', value: 'K' },
      { suit: 'diamonds', value: 'Q' },
    ];

    const { getByText, getAllByText } = render(<PlayerHand initialCards={initialCards} />);
    
    // Check that a new card 'J of clubs' can be added
    fireEvent.click(getByText('Add J of clubs'));

    // Verify that the new card is added and rendered
    expect(getAllByText('J')[0]).toBeInTheDocument();
    expect(getAllByText('clubs')[0]).toBeInTheDocument();
  });

  it('removes a card from the hand', () => {
    const initialCards = [
      { suit: 'hearts', value: 'A' },
      { suit: 'spades', value: 'K' },
      { suit: 'diamonds', value: 'Q' },
    ];

    const { getByText, queryByText } = render(<PlayerHand initialCards={initialCards} />);

    // Simulate playing a card (click the card with value 'Q')
    fireEvent.click(getByText('Q'));
    
    // Verify that the card with value 'Q' is no longer rendered
    expect(queryByText('Q')).not.toBeInTheDocument();
  });

  it('displays a message when no cards are left', () => {
    const initialCards = [];

    const { getByText } = render(<PlayerHand initialCards={initialCards} />);

    // Check that the message 'No cards left' is rendered when hand is empty
    expect(getByText('No cards left')).toBeInTheDocument();
  });
});