import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  it('renders correctly with provided value', () => {
    render(<SearchInput value="test" onSearch={() => {}} />);

    const input = screen.getByPlaceholderText(/zoek op/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test');
  });

  it('renders search icon', () => {
    render(<SearchInput value="" onSearch={() => {}} />);

    // Since the img has aria-hidden=true, we need to query it by its src attribute
    const icon = screen.getByAltText('');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('calls onSearch handler when input value changes', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();

    render(<SearchInput value="" onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/zoek op/i);

    // Type one character at a time
    await user.type(input, 't');
    expect(handleSearch).toHaveBeenCalledWith('t');

    await user.clear(input);
    await user.paste('test');
    expect(handleSearch).toHaveBeenCalledWith('test');
  });

  it('focuses input on mount', () => {
    render(<SearchInput value="" onSearch={() => {}} />);

    const input = screen.getByPlaceholderText(/zoek op/i);
    expect(input).toHaveFocus();
  });
});
