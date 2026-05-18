import clsx from 'clsx';
import { Check } from 'lucide-react';

import type { TaskEntity } from '@/entities/task';
import { APP_TEXT } from '@/shared/constants';

import styles from './Task.module.scss';

type TaskProps = {
  task: TaskEntity
  onToggle: (task: TaskEntity) => void
  disabled?: boolean
};

export function Task({ task, onToggle, disabled = false }: TaskProps) {
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
      {task.done ? (
        <span className={styles.badge} aria-label={APP_TEXT.tasks.completed}>
          <Check aria-hidden="true" size={16} />
        </span>
      ) : null}
    </li>
  );
}