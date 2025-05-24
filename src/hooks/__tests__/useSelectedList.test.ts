import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSelectedList } from '../useSelectedList';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// Replace the global localStorage object with our mock
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('useSelectedList hook', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with an empty array if no stored items', () => {
    const { result } = renderHook(() => useSelectedList());
    expect(result.current.selectedItems).toEqual([]);
  });

  it('loads stored items from localStorage on initialization', () => {
    // Pre-populate mock localStorage
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify(['item1', 'item2'])
    );

    const { result } = renderHook(() => useSelectedList());
    expect(result.current.selectedItems).toEqual(['item1', 'item2']);
  });

  it('adds an item when it is not in the list', () => {
    const { result } = renderHook(() => useSelectedList());

    act(() => {
      result.current.toggleSelectedItem('item1');
    });

    expect(result.current.selectedItems).toContain('item1');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'selectedItems',
      JSON.stringify(['item1'])
    );
  });

  it('removes an item when it is already in the list', () => {
    // Pre-populate mock localStorage
    localStorageMock.getItem.mockReturnValueOnce(
      JSON.stringify(['item1', 'item2'])
    );

    const { result } = renderHook(() => useSelectedList());

    act(() => {
      result.current.toggleSelectedItem('item1');
    });

    expect(result.current.selectedItems).not.toContain('item1');
    expect(result.current.selectedItems).toContain('item2');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'selectedItems',
      JSON.stringify(['item2'])
    );
  });
});
