import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useFilteredList } from '../useFilteredList';

describe('useFilteredList hook', () => {
  const items = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes'];

  it('returns all items when search string is empty', () => {
    const { result } = renderHook(() => useFilteredList(items, ''));
    expect(result.current).toEqual(items);
    expect(result.current.length).toBe(5);
  });

  it('filters items case-insensitively', () => {
    const { result: resultLower } = renderHook(() =>
      useFilteredList(items, 'apple')
    );
    expect(resultLower.current).toEqual(['Apple', 'Pineapple']);

    const { result: resultUpper } = renderHook(() =>
      useFilteredList(items, 'APPLE')
    );
    expect(resultUpper.current).toEqual(['Apple', 'Pineapple']);
  });

  it('returns empty array when no items match the search', () => {
    const { result } = renderHook(() => useFilteredList(items, 'kiwi'));
    expect(result.current).toEqual([]);
  });

  it('handles partial matches', () => {
    const { result } = renderHook(() => useFilteredList(items, 'an'));
    expect(result.current).toEqual(['Banana', 'Orange']);
  });

  it('works with empty items array', () => {
    const { result } = renderHook(() => useFilteredList([], 'apple'));
    expect(result.current).toEqual([]);
  });
});
