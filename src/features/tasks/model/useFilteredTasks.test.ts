import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { TaskEntity } from '@/entities/task';

import type { TaskFilter } from './taskFilterSlice';
import { useFilteredTasks } from './useFilteredTasks';

describe('useFilteredTasks', () => {
  const tasks: TaskEntity[] = [
    { id: 1, title: 'Молоко', done: false, createdAt: '2026-05-20' },
    { id: 2, title: 'Хлеб', done: true, createdAt: '2026-05-20' },
    { id: 3, title: 'Яблоки', done: false, createdAt: '2026-05-20' },
  ];

  it.each([
    ['all', [1, 2, 3]],
    ['active', [1, 3]],
    ['completed', [2]],
  ] satisfies Array<[TaskFilter, number[]]>)(
    'returns tasks filtered by "%s"',
    (filter, expectedIds) => {
      const { result } = renderHook(() => useFilteredTasks(tasks, filter));

      expect(result.current.map((task) => task.id)).toEqual(expectedIds);
    },
  );
});