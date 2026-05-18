import {
  type FormEvent,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react';
import { Plus } from 'lucide-react';

import { useCreateTaskMutation } from '@/features/tasks/api/tasksApi';
import { APP_TEXT, FORM_LIMITS } from '@/shared/constants';

import styles from './CreateTaskFab.module.scss';

type CreateTaskFabProps = {
  login: string
}

export function CreateTaskFab({ login }: CreateTaskFabProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [title, setTitle] = useState('');
  const [formError, setFormError] = useState('');
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const open = useCallback(() => {
    setFormError('');
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
    setTitle('');
    setFormError('');
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setFormError(APP_TEXT.tasks.create.requiredError);
      return;
    }
    setFormError('');
    try {
      await createTask({ login, title: trimmed }).unwrap();
      close();
    } catch {
      setFormError(APP_TEXT.tasks.create.fallbackError);
    }
  };

  return (
    <>
      <button
        type="button"
        className={styles.fab}
        onClick={open}
        aria-label={APP_TEXT.tasks.create.title}
        title={APP_TEXT.tasks.create.title}
      >
        <Plus className={styles.fabIcon} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClose={() => {
          setTitle('');
          setFormError('');
        }}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 id={titleId} className={styles.formTitle}>
            {APP_TEXT.tasks.create.title}
          </h2>
          <input
            id={`${titleId}-input`}
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={APP_TEXT.tasks.create.placeholder}
            maxLength={FORM_LIMITS.taskTitleMaxLength}
            disabled={isLoading}
            autoFocus
          />
          {formError ? (
            <p className={styles.formError} role="alert">
              {formError}
            </p>
          ) : null}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={close}
              disabled={isLoading}
            >
              {APP_TEXT.tasks.create.cancel}
            </button>
            <button type="submit" className={styles.btnPrimary} disabled={isLoading}>
              {isLoading
                ? APP_TEXT.tasks.create.submitting
                : APP_TEXT.tasks.create.submit}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
