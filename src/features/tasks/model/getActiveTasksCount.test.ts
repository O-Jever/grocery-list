import { describe, expect, it } from 'vitest';

import type { TaskEntity } from '@/entities/task';

import { getActiveTasksCount } from './getActiveTasksCount';

describe('getActiveTasksCount', () => {
  it('counts only incomplete tasks', () => {
    const tasks: TaskEntity[] = [
      { id: 1, title: 'Молоко', done: false, createdAt: '2026-05-20' },
      { id: 2, title: 'Хлеб', done: true, createdAt: '2026-05-20' },
      { id: 3, title: 'Яблоки', done: false, createdAt: '2026-05-20' },
    ];

    expect(getActiveTasksCount(tasks)).toBe(2);
  });
});
