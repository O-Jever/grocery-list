import { useCallback, useMemo, useRef, useState } from 'react';
import { FilterIcon, Trash2 } from 'lucide-react';

import { useAppSelector } from '@/app/store/hooks';
import type { TaskEntity } from '@/entities/task';
import { useDeleteTaskMutation, useDeleteTasksMutation, useGetTasksQuery, useMarkDoneMutation } from '@/features/tasks/api/tasksApi';
import { APP_TEXT } from '@/shared/constants';
import { getErrorMessage } from '@/shared/lib/getErrorMessage';
import { useOutsidePointerClose } from '@/shared/lib/useOutsidePointerClose';
import { Count, ErrorMessage, Filter, Loading, Task, Tooltip } from '@/shared/ui';

import { selectTaskFilter } from '../model/taskFilterSlice';
import { useActiveTasksCount } from '../model/useActiveTasksCount';
import { useFilteredTasks } from '../model/useFilteredTasks';
import styles from './TasksSection.module.scss';

type TasksSectionProps = {
  login: string;
};

export function TasksSection({ login }: TasksSectionProps) {
  const { data, isLoading, isError, error, refetch, isFetching } = useGetTasksQuery(login);
  const tasks = useMemo(() => data?.tasks ?? [], [data]);
  const [markTaskDone, { isLoading: isMarkingDone }] = useMarkDoneMutation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filter = useAppSelector(selectTaskFilter);
  const filterRef = useRef<HTMLDivElement>(null);
  const activeTasksCount = useActiveTasksCount(tasks);
  const filteredTasks = useFilteredTasks(tasks, filter);
  const [deleteTask, { isLoading: isDeletingTask }] = useDeleteTaskMutation();
  const [deleteTasks] = useDeleteTasksMutation();

  const closeFilter = useCallback(() => {
    setIsFilterOpen(false);
  }, []);

  useOutsidePointerClose({
    enabled: isFilterOpen,
    ref: filterRef,
    onClose: closeFilter,
  });

  function markDone(task: TaskEntity) {
    markTaskDone({ id: task.id, login, done: !task.done });
  }

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  if (isError) {
    return (
      <ErrorMessage
        title={APP_TEXT.tasks.heading}
        message={getErrorMessage(error, APP_TEXT.tasks.loadError)}
        retryLabel={APP_TEXT.tasks.retry}
        onRetry={refetch}
      />
    );
  }

  function toggleFilter() {
    setIsFilterOpen((current) => !current);
  }

  function clearList() {
    deleteTasks({ login, ids: filteredTasks.map((task) => task.id) });
  }

  function deleteTaskById(taskId: number) {
    deleteTask({ id: taskId, login });
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.heading}>{APP_TEXT.tasks.heading}</h2>
          <Count count={activeTasksCount} />
        </div>
        <div>
          {isFetching ? <Loading isLoading size="small" fullPage={false} /> :
          <div ref={filterRef} className={styles.filterWrapper}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={toggleFilter}
              aria-label="Показать фильтры"
              aria-expanded={isFilterOpen}
            >
              <FilterIcon size={22} aria-hidden="true" />
            </button>
            {isFilterOpen ? (
              <Filter onClose={closeFilter} />
            ) : null}
          </div>}
          <div className={styles.filterWrapper}>
            <Tooltip content="Удалить продукты из текущей выборки" align="right">
              <button
                type="button"
                className={styles.iconButton}
                onClick={clearList}
                aria-label="Удалить список"
              >
                <Trash2 size={22} aria-hidden="true" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      {tasks.length === 0 ? (
        <p className={styles.muted}>{APP_TEXT.tasks.empty}</p>
      ) : (
        <ul className={styles.list}>
          {filteredTasks.map((task: TaskEntity) => (
            <Task
              key={task.id}
              task={task}
              onToggle={markDone}
              onDelete={deleteTaskById}
              disabled={isMarkingDone || isDeletingTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
