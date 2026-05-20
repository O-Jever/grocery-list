import { describe, expect, it } from 'vitest';

import { setTaskFilter, taskFilterSlice } from './taskFilterSlice';

describe('taskFilterSlice', () => {
  it('uses "all" as initial filter', () => {
    const state = taskFilterSlice.reducer(undefined, { type: 'unknown' });
    expect(state.value).toBe('all');
  });
  
  it('changes filter', () => {
    const state = taskFilterSlice.reducer(undefined, setTaskFilter('completed'));
    expect(state.value).toBe('completed');
  });
});