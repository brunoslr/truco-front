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

  expect(getByText('A of hearts')).toBeInTheDocument();
  expect(getByText('K of spades')).toBeInTheDocument();
  expect(getByText('Q of diamonds')).toBeInTheDocument();

  fireEvent.click(getByText('A of hearts'));

  expect(queryByText('A of hearts')).not.toBeInTheDocument();
  expect(getByText('K of spades')).toBeInTheDocument();
  expect(getByText('Q of diamonds')).toBeInTheDocument();
});
