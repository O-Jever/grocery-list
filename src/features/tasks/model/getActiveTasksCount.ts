import { TaskEntity } from '@/entities/task/model/types';

export function getActiveTasksCount(tasks: TaskEntity[]): number {
    return tasks.reduce((count, task) => task.done ? count : count + 1, 0);
}