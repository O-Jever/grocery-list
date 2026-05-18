import { useMemo } from 'react';

import { TaskEntity } from '@/entities/task';

import { TaskFilter } from './taskFilterSlice';

export function useFilteredTasks(tasks: TaskEntity[], filter: TaskFilter) {
  return useMemo(() => {
    if (filter === 'active') return tasks.filter((t) => !t.done);
    if (filter === 'completed') return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);
}