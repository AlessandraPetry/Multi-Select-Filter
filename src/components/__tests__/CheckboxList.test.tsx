import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CheckboxList } from '../CheckboxList';

// Mock the CSS modules
vi.mock('../CheckboxList.module.scss', () => ({
  default: {
    checkboxListContainer: 'checkboxListContainer',
    skeletonItem: 'skeletonItem',
    errorMessage: 'errorMessage',
  },
}));

// Mock the hooks
vi.mock('../../hooks/useSelectedList', () => ({
  useSelectedList: () => ({
    selectedItems: ['item2'],
    toggleSelectedItem: vi.fn(),
  }),
}));

vi.mock('../../hooks/useFilteredList', () => ({
  useFilteredList: (items: string[]) => items,
}));

describe('CheckboxList component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    render(
      <CheckboxList
        isLoading={true}
        isError={false}
        items={['item1', 'item2', 'item3']}
        search=""
      />
    );

    // Should show skeleton loading items
    const skeletonItems = document.querySelectorAll('.skeletonItem');
    expect(skeletonItems.length).toBe(8);
  });

  it('renders error state', () => {
    render(
      <CheckboxList
        isLoading={false}
        isError={true}
        items={['item1', 'item2', 'item3']}
        search=""
      />
    );

    // Should show error message
    expect(screen.getByText('Failed to load items.')).toBeInTheDocument();
  });

  it('renders items correctly', () => {
    render(
      <CheckboxList
        isLoading={false}
        isError={false}
        items={['item1', 'item2', 'item3']}
        search=""
      />
    );

    // Should show all items
    expect(screen.getByText('item1')).toBeInTheDocument();
    expect(screen.getByText('item2')).toBeInTheDocument();
    expect(screen.getByText('item3')).toBeInTheDocument();
  });

  it('separates selected items from unselected ones', () => {
    render(
      <CheckboxList
        isLoading={false}
        isError={false}
        items={['item1', 'item2', 'item3']}
        search=""
      />
    );

    // Find all checkboxes
    const checkboxes = screen.getAllByRole('checkbox');

    // Map them to get their checked state and label
    const checkboxStates = checkboxes.map((checkbox) => ({
      label: checkbox.closest('label')?.textContent,
      checked: (checkbox as HTMLInputElement).checked,
    }));

    // Find item2 (which should be checked according to our mock)
    const item2 = checkboxStates.find((item) => item.label === 'item2');
    expect(item2).toBeDefined();
    expect(item2?.checked).toBe(true);

    // Find item1 and item3 (which should not be checked)
    const item1 = checkboxStates.find((item) => item.label === 'item1');
    const item3 = checkboxStates.find((item) => item.label === 'item3');
    expect(item1).toBeDefined();
    expect(item3).toBeDefined();
    expect(item1?.checked).toBe(false);
    expect(item3?.checked).toBe(false);
  });
});
