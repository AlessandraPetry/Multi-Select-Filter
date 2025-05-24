import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce hook', () => {
  // Mock timers
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('does not update the value before the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Change the value
    rerender({ value: 'changed', delay: 500 });

    // Advance time, but not enough to trigger the debounce
    act(() => {
      vi.advanceTimersByTime(400);
    });

    // Value should still be the initial one
    expect(result.current).toBe('initial');
  });

  it('updates the value after the delay', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Change the value
    rerender({ value: 'changed', delay: 500 });

    // Advance time enough to trigger the debounce
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // Value should be updated
    expect(result.current).toBe('changed');
  });

  it('clears the timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { unmount } = renderHook(() => useDebounce('test', 500));

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('resets the timeout when the value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    // Change the value
    rerender({ value: 'changed1', delay: 500 });

    // Advance time, but not enough
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Change the value again
    rerender({ value: 'changed2', delay: 500 });

    // Advance time, but still not enough for the second change
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // First change should not have taken effect
    expect(result.current).toBe('initial');

    // Advance time enough for the second change
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Now the second change should be visible
    expect(result.current).toBe('changed2');
  });
});
