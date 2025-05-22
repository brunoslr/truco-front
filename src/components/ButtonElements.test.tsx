import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ButtonElements from './ButtonElements';

describe('ButtonElements', () => {
  it('renders Truco button when isTrucoCalled is false', () => {
    const onTruco = jest.fn();
    const { getByText, queryByText } = render(
      <ButtonElements
        onTruco={onTruco}
        onRaise={jest.fn()}
        onFold={jest.fn()}
        isTrucoCalled={false}
        isRaiseEnabled={true}
      />
    );
    expect(getByText('Truco!')).toBeInTheDocument();
    expect(queryByText('Raise')).not.toBeInTheDocument();
    fireEvent.click(getByText('Truco!'));
    expect(onTruco).toHaveBeenCalled();
  });

  it('renders Raise button when isTrucoCalled is true', () => {
    const onRaise = jest.fn();
    const { getByText, queryByText } = render(
      <ButtonElements
        onTruco={jest.fn()}
        onRaise={onRaise}
        onFold={jest.fn()}
        isTrucoCalled={true}
        isRaiseEnabled={true}
      />
    );
    expect(getByText('Raise')).toBeInTheDocument();
    expect(queryByText('Truco!')).not.toBeInTheDocument();
    fireEvent.click(getByText('Raise'));
    expect(onRaise).toHaveBeenCalled();
  });

  it('disables Raise button when isRaiseEnabled is false', () => {
    const { getByText } = render(
      <ButtonElements
        onTruco={jest.fn()}
        onRaise={jest.fn()}
        onFold={jest.fn()}
        isTrucoCalled={true}
        isRaiseEnabled={false}
      />
    );
    expect(getByText('Raise')).toBeDisabled();
  });

  it('disables Raise button when isRaiseDisabledForPlayer is true', () => {
    const { getByText } = render(
      <ButtonElements
        onTruco={jest.fn()}
        onRaise={jest.fn()}
        onFold={jest.fn()}
        isTrucoCalled={true}
        isRaiseEnabled={true}
        isRaiseDisabledForPlayer={true}
      />
    );
    expect(getByText('Raise')).toBeDisabled();
  });

  it('calls onFold when Fold button is clicked', () => {
    const onFold = jest.fn();
    const { getByText } = render(
      <ButtonElements
        onTruco={jest.fn()}
        onRaise={jest.fn()}
        onFold={onFold}
        isTrucoCalled={false}
        isRaiseEnabled={true}
      />
    );
    fireEvent.click(getByText('Fold'));
    expect(onFold).toHaveBeenCalled();
  });
});
