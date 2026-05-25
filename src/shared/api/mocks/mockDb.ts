import type { TaskEntity } from '@/entities/task';

let nextId = 100;
const defaultTasks: TaskEntity[] = [{
    id: 1,
    title: 'Молоко',
    done: true,
    createdAt: '2026-05-25T08:30:00.000Z',
  }, {
    id: 2,
    title: 'Хлеб',
    done: false,
    createdAt: '2026-05-25T09:00:00.000Z',
  }, {
    id: 3,
    title: 'Филе',
    done: false,
    createdAt: '2026-05-25T09:30:00.000Z',
}];

const tasksByLogin = new Map<string, TaskEntity[]>();

export function getMockTasks(login: string): TaskEntity[] {
  if (!tasksByLogin.has(login)) {
    tasksByLogin.set(
      login,
      defaultTasks.map((task) => ({ ...task })),
    );
  }

  return tasksByLogin.get(login) ?? [];
}

export function createMockTask(login: string, title: string): TaskEntity {
  const tasks = getMockTasks(login);
  const task: TaskEntity = {
    id: nextId++,
    title,
    done: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);

  return task;
}

export function updateMockTask(
  login: string,
  id: number,
  patch: Partial<Pick<TaskEntity, 'done' | 'title'>>,
): TaskEntity | null {
  const tasks = getMockTasks(login);
  const index = tasks.findIndex((t) => t.id === id);
 
  if (index === -1) {
    return null;
  }
 
  tasks[index] = { ...tasks[index], ...patch };

  return tasks[index];
}

export function deleteMockTask(login: string, id: number): boolean {
  const tasks = getMockTasks(login);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);

  return true;
}
