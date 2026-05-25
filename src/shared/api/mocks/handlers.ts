import { http, HttpResponse } from 'msw';

import type {
  LoginRequestBody,
  LoginResponse,
} from '@/features/auth-by-password/api/authApi.types';
import type { CreateTaskBody, CreateTaskResponse, DeleteTaskBody, DeleteTasksBody, DeleteTasksResponse, 
  GetTasksResponse, MarkDoneBody, MarkDoneResponse } from '@/features/tasks/api/tasksApi.types';
import { API_ENDPOINTS } from '@/shared/constants';

import { createMockTask, deleteMockTask, getMockTasks, updateMockTask } from './mockDb';

export const handlers = [
  http.post(`*/api${API_ENDPOINTS.tasks}`, async ({ request }) => {
    const body = (await request.json()) as CreateTaskBody;
    const login = body.login?.trim() || 'demo';
    const title = body.title?.trim();
    if (!title) {
      return HttpResponse.json({ message: 'Title required' }, { status: 400 });
    }
    const task = createMockTask(login, title);
    return HttpResponse.json<CreateTaskResponse>({ task }, { status: 201 });
  }),

  http.patch(`*/api${API_ENDPOINTS.tasks}/:id`, async ({ request, params }) => {
    const id = Number(params.id);
    const body = (await request.json()) as MarkDoneBody;
    const login = body.login?.trim() || 'demo';
    const task = updateMockTask(login, id, { done: body.done });
    if (!task) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return HttpResponse.json<MarkDoneResponse>({ task });
  }),

  http.delete(`*/api${API_ENDPOINTS.tasks}/:id`, async ({ request, params }) => {
    const id = Number(params.id);
    const body = (await request.json()) as DeleteTaskBody;
    const login = body.login?.trim() || 'demo';
    const removed = deleteMockTask(login, id);
    if (!removed) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return new HttpResponse(null, { status: 204 });
  }),

  http.post(`*/api${API_ENDPOINTS.authLogin}`, async ({ request }) => {
    const body = (await request.json()) as Partial<LoginRequestBody>;
    const login = body.login?.trim() || 'demo';

    return HttpResponse.json<LoginResponse>({
      user: {
        id: 1,
        login,
      },
    });
  }),

  http.delete(`*/api${API_ENDPOINTS.tasks}`, async ({ request }) => {
    await request.json() as DeleteTasksBody;
    return HttpResponse.json<DeleteTasksResponse>({ ok: true });
  }),

  http.get(`*/api${API_ENDPOINTS.health}`, () => {
    return HttpResponse.json({ ok: true });
  }),

  http.get(`*/api${API_ENDPOINTS.tasks}`, ({ request }) => {
    const url = new URL(request.url);
    const login = url.searchParams.get('login')?.trim() || 'demo';

    return HttpResponse.json<GetTasksResponse>({
      tasks: getMockTasks(login),
    });
  }),
];
