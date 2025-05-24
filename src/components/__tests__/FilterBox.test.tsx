import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FilterBox } from '../FilterBox';

// Mock the fetch hook
vi.mock('../../hooks/useFetch', () => ({
  useFetch: () => ({
    data: { data: ['item1', 'item2', 'item3'] },
    isLoading: false,
    isError: false,
  }),
}));

// Mock the debounce hook
vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value: string) => value,
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('FilterBox component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([]));
    vi.clearAllMocks();
  });

  it('renders the component with title', () => {
    render(<FilterBox />);
    expect(screen.getByText('Productgroep')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<FilterBox />);
    expect(screen.getByPlaceholderText('Zoek op ...')).toBeInTheDocument();
  });

  it('renders the apply button', () => {
    render(<FilterBox />);
    expect(
      screen.getByRole('button', { name: /toepassen/i })
    ).toBeInTheDocument();
  });

  it('renders the list of items', () => {
    render(<FilterBox />);
    expect(screen.getByText('item1')).toBeInTheDocument();
    expect(screen.getByText('item2')).toBeInTheDocument();
    expect(screen.getByText('item3')).toBeInTheDocument();
  });
});
