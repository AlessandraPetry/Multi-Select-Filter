import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxItem } from '../CheckboxItem';

describe('CheckboxItem', () => {
  it('renders correctly with provided label', () => {
    render(
      <CheckboxItem id="test-checkbox" label="Test Label" onChange={() => {}} />
    );

    const checkbox = screen.getByRole('checkbox', { name: /test label/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders checked checkbox when checked prop is true', () => {
    render(
      <CheckboxItem
        id="test-checkbox"
        label="Test Label"
        checked
        onChange={() => {}}
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: /test label/i });
    expect(checkbox).toBeChecked();
  });

  it('applies some class to label when checked', () => {
    render(
      <CheckboxItem
        id="test-checkbox"
        label="Test Label"
        checked
        onChange={() => {}}
      />
    );

    const label = screen.getByText(/test label/i).closest('label');
    // With CSS modules, we can't check for exact class names, so we'll just check that it exists
    expect(label).toHaveAttribute('class');
    expect(label?.className).toContain('_checked_');
  });

  it('calls onChange handler with label when clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <CheckboxItem
        id="test-checkbox"
        label="Test Label"
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: /test label/i });
    await user.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('Test Label');
  });
});
