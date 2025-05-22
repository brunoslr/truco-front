import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PlayerHand from './PlayerHand';

test('PlayerHand renders with 3 cards and can play a card', () => {
  const initialCards = [
    { suit: 'hearts', value: 'A' },
    { suit: 'spades', value: 'K' },
    { suit: 'diamonds', value: 'Q' },
  ];

  const { getByText, queryByText } = render(<PlayerHand initialCards={initialCards} />);

  // Check that all cards are rendered initially
  expect(getByText('A of hearts')).toBeInTheDocument();
  expect(getByText('K of spades')).toBeInTheDocument();
  expect(getByText('Q of diamonds')).toBeInTheDocument();

  // Simulate playing a card
  fireEvent.click(getByText('A of hearts'));

  // Verify that the played card is no longer rendered
  expect(queryByText('A of hearts')).not.toBeInTheDocument();
  // Verify that the remaining cards are still rendered
  expect(getByText('K of spades')).toBeInTheDocument();
  expect(getByText('Q of diamonds')).toBeInTheDocument();
});