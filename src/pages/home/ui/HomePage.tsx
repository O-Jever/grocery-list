import { LogOut } from 'lucide-react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { logout, selectSessionUser } from '@/entities/session';
import { CreateTaskFab } from '@/features/tasks/ui/CreateTaskFab';
import { TasksSection } from '@/features/tasks/ui/TasksSection';
import { APP_TEXT } from '@/shared/constants';

import styles from './HomePage.module.scss';

export function HomePage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectSessionUser);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{APP_TEXT.navigation.homeTitle}</h1>
        <button
          type="button"
          className={styles.logoutBtn}
          onClick={() => dispatch(logout())}
          aria-label={APP_TEXT.navigation.logout}
          title={APP_TEXT.navigation.logout}
        >
          <LogOut className={styles.logoutIcon} aria-hidden="true" />
        </button>
      </header>
      {user ? <TasksSection login={user.login} /> : null}
      {user ? <CreateTaskFab login={user.login} /> : null}
    </main>
  );
}
