import type { TaskEntity } from '@/entities/task';

export type GetTasksResponse = {
  tasks: TaskEntity[];
};

export type CreateTaskBody = {
  login: string;
  title: string;
};

export type CreateTaskResponse = {
  task: TaskEntity;
};

export type MarkDoneBody = {
  id: number;
  login: string;
  done: boolean;
};

export type MarkDoneResponse = {
  task: TaskEntity;
};

export type DeleteTaskBody = {
  id: number;
  login: string;
};

export type DeleteTasksBody = {
  login: string;
  ids: number[];
};

export type DeleteTasksResponse = {
  ok: boolean;
};
