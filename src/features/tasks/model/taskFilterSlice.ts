import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store/store';

export type TaskFilter = 'all' | 'active' | 'completed';

type TaskFilterState = {
  value: TaskFilter;
};

const initialState: TaskFilterState = {
  value: 'all',
};

export const taskFilterSlice = createSlice({
  name: 'taskFilter',
  initialState,
  reducers: {
    setTaskFilter(state, action: PayloadAction<TaskFilter>) {
      state.value = action.payload;
    },
  },
});

export const selectTaskFilter = (state: RootState) => state.taskFilter.value;

export const { setTaskFilter } = taskFilterSlice.actions;