import clsx from 'clsx';
import { Check, Trash } from 'lucide-react';

import type { TaskEntity } from '@/entities/task';
import { APP_TEXT } from '@/shared/constants';

import styles from './Task.module.scss';

type TaskProps = {
  task: TaskEntity;
  onToggle: (task: TaskEntity) => void;
  disabled?: boolean;
  onDelete: (taskId: number) => void;
};

export function Task({ task, onToggle, disabled = false, onDelete }: TaskProps) {
  return (
    <li className={styles.item}>
      <button
        type="button"
        className={clsx(styles.title, task.done && styles.titleDone)}
        onClick={() => onToggle(task)}
        disabled={disabled}
      >
        {task.title}
      </button>
      <div className={styles.iconButtonWrapper}>
        {task.done ? (
          <span className={styles.badge} aria-label={APP_TEXT.tasks.completed}>
            <Check aria-hidden="true" size={16} />
          </span>
        ) : null}
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => onDelete(task.id)}
          aria-label="Удалить задачу"
        >
          <Trash size={16} aria-hidden="true" />
        </button>
      </div>

    </li>
  );
}