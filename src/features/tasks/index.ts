export {
  tasksApi,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useDeleteTasksMutation,
  useGetTasksQuery,
  useLazyGetTasksQuery,
  useMarkDoneMutation,
} from './api/tasksApi';
export type {
  CreateTaskBody,
  CreateTaskResponse,
  DeleteTaskBody,
  DeleteTasksBody,
  DeleteTasksResponse,
  GetTasksResponse,
  MarkDoneBody,
  MarkDoneResponse,
} from './api/tasksApi.types';
