import React from 'react';
import { render, screen } from '@testing-library/react';
import StakesDisplay from './StakesDisplay';

describe('StakesDisplay', () => {
  it('renders the current stakes value', () => {
    render(<StakesDisplay stakes={4} />);
    expect(screen.getByText('Stakes:')).toBeInTheDocument();
    expect(screen.getByText('4 points')).toBeInTheDocument();
  });

  it('renders singular for 1 point', () => {
    render(<StakesDisplay stakes={1} />);
    expect(screen.getByText('1 point')).toBeInTheDocument();
  });
});
