import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';

vi.mock('../FilterBox', () => ({
  FilterBox: () => <div data-testid="filter-box">FilterBox Component</div>,
}));

describe('App component', () => {
  it('renders the FilterBox component', () => {
    render(<App />);

    expect(screen.getByTestId('filter-box')).toBeInTheDocument();
    expect(screen.getByText('FilterBox Component')).toBeInTheDocument();
  });
});
