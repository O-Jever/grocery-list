import '@/features/auth-by-password/api/authApi';
import '@/features/tasks/api/tasksApi';

import { configureStore } from '@reduxjs/toolkit';

import { sessionSlice } from '@/entities/session';
import { taskFilterSlice } from '@/features/tasks/model/taskFilterSlice';
import { baseApi } from '@/shared/api/rtk/baseApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [taskFilterSlice.name]: taskFilterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
