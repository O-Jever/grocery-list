import { useMemo } from 'react';

import type { TaskEntity } from '@/entities/task';

export function useActiveTasksCount(tasks: TaskEntity[]): number {
  return useMemo(
    () => tasks.reduce((count, task) => task.done ? count : count + 1, 0),
    [tasks],
  );
}