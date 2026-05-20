import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { TaskEntity } from '@/entities/task';

import { Task } from './Task';

describe('Task', () => {
  const task: TaskEntity = {
    id: 1,
    title: 'Молоко',
    done: false,
    createdAt: '2026-05-20',
  };

  it('calls onToggle when task title is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(
      <Task
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Молоко' }));

    expect(onToggle).toHaveBeenCalledWith(task);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(
      <Task
        task={task}
        onToggle={onToggle}
        onDelete={onDelete}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Удалить продукт' }));

    expect(onDelete).toHaveBeenCalledWith(1);
  });
});