import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('renders correctly with default text', () => {
    render(<Button />);

    const buttonElement = screen.getByRole('button', { name: /toepassen/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
