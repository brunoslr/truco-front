import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  it('renders the value and suit', () => {
    render(<Card value="A" suit="♠" highlight={false} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('♠')).toBeInTheDocument();
  });

  it('applies highlight class when highlight is true', () => {
    const { container } = render(<Card value="7" suit="♥" highlight={true} />);
    // The highlight class should be present
    expect(container.firstChild).toHaveClass('highlight');
  });

  it('does not apply highlight class when highlight is false', () => {
    const { container } = render(<Card value="K" suit="♦" highlight={false} />);
    // The highlight class should not be present
    expect(container.firstChild).not.toHaveClass('highlight');
  });
});
