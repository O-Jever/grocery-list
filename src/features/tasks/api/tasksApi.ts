import { baseApi } from '@/shared/api/rtk/baseApi';
import {
  API_ENDPOINTS,
  API_TAGS,
  HTTP_METHODS,
} from '@/shared/constants';

import type {
  CreateTaskBody,
  CreateTaskResponse,
  DeleteTaskBody,
  DeleteTasksBody,
  DeleteTasksResponse,
  GetTasksResponse,
  MarkDoneBody,
  MarkDoneResponse,
} from './tasksApi.types';

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (login) => ({
        url: API_ENDPOINTS.tasks,
        params: { login },
      }),
      providesTags: [API_TAGS.TASKS],
    }),
    createTask: build.mutation<CreateTaskResponse, CreateTaskBody>({
      query: (body) => ({
        url: API_ENDPOINTS.tasks,
        method: HTTP_METHODS.post,
        body,
      }),
      invalidatesTags: [API_TAGS.TASKS],
    }),
    markDone: build.mutation<MarkDoneResponse, MarkDoneBody>({
      query: ({ id, ...body }) => ({
        url: API_ENDPOINTS.taskById(id),
        method: HTTP_METHODS.patch,
        body,
      }),
      invalidatesTags: [API_TAGS.TASKS],
    }),
    deleteTask: build.mutation<void, DeleteTaskBody>({
      query: ({ id, ...body }) => ({
        url: API_ENDPOINTS.taskById(id),
        method: HTTP_METHODS.delete,
        body,
      }),
      invalidatesTags: [API_TAGS.TASKS],
    }),
    deleteTasks: build.mutation<DeleteTasksResponse, DeleteTasksBody>({
      query: (body) => ({
        url: API_ENDPOINTS.tasks,
        method: HTTP_METHODS.delete,
        body,
      }),
      invalidatesTags: [API_TAGS.TASKS],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useLazyGetTasksQuery,
  useMarkDoneMutation,
  useDeleteTaskMutation,
  useDeleteTasksMutation,
} = tasksApi;
