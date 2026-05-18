import type { TaskEntity } from '@/entities/task';
import { baseApi } from '@/shared/api/rtk/baseApi';
import {
  API_ENDPOINTS,
  API_TAGS,
  HTTP_METHODS
} from '@/shared/constants';

export type GetTasksResponse = {
  tasks: TaskEntity[]
}

export type CreateTaskBody = {
  login: string
  title: string
}

export type CreateTaskResponse = {
  task: TaskEntity
}

export type MarkDoneBody = {
  id: number
  login: string
  done: boolean
}

export type MarkDoneResponse = {
  task: TaskEntity
}

export type DeleteTaskBody = {
  id: number
  login: string
}

export type DeleteTasksBody = {
  login: string;
  ids: number[];
}

export type DeleteTasksResponse = {
  ok: boolean;
}

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
  useDeleteTasksMutation
} = tasksApi;
