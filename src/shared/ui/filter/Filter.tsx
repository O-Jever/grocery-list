import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { selectTaskFilter, setTaskFilter, type TaskFilter } from '@/features/tasks/model/taskFilterSlice';

import styles from './Filter.module.scss';

type FilterFormValues = {
  filter: TaskFilter;
}

const TaskFilterNames: { id: TaskFilter, name: string}[] = [
  {
    id: 'all',
    name: 'Все'
  },
  {
    id: 'active',
    name: 'Активные'
  },
  {
    id: 'completed',
    name: 'Выполненные'
  }
];

type FilterProps = {
  onClose?: () => void;
};

export function Filter({ onClose }: FilterProps) {
  const dispatch = useAppDispatch();
  const reduxFilter: TaskFilter = useAppSelector(selectTaskFilter);

  const { control, reset } = useForm<FilterFormValues>({
    defaultValues: { filter: reduxFilter },
  });

  useEffect(() => {
    reset({ filter: reduxFilter });
  }, [reduxFilter, reset]);

  return (
    <Controller
      control={control}
      name="filter"
      render={({ field }) => (
        <div className={styles.menu} role="listbox" aria-label="Фильтр задач">
          {TaskFilterNames.map((elem) => {
            const selected = field.value === elem.id;
            return (
              <button
                key={elem.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={selected ? styles.menuItemActive : styles.menuItem}
                onClick={() => {
                  field.onChange(elem.id);
                  dispatch(setTaskFilter(elem.id));
                  onClose?.();
                }}
              >
                {elem.name}
              </button>
            );
          })}
        </div>
      )}
    />
  );
}