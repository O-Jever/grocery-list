export const DOM_IDS = {
  root: 'root',
  authLoginInput: 'auth-login',
  authPasswordInput: 'auth-password',
} as const;

export const API_ENDPOINTS = {
  health: '/health',
  authLogin: '/auth/login',
  tasks: '/tasks',
  taskById: (id: number) => `/tasks/${id}`,
} as const;

export const HTTP_METHODS = {
  post: 'POST',
  patch: 'PATCH',
} as const;

export const API_TAGS = {
  TASKS: 'TASKS',
} as const;

export const FORM_LIMITS = {
  loginMinLength: 3,
  loginMaxLength: 64,
  passwordMinLength: 6,
  taskTitleMaxLength: 500,
} as const;
