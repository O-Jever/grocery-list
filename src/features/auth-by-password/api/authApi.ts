import { baseApi } from '@/shared/api/rtk/baseApi';
import { API_ENDPOINTS, HTTP_METHODS } from '@/shared/constants';

export type HealthResponse = { ok: boolean }

export type LoginRequestBody = {
  login: string
  password: string
}

export type LoginResponse = {
  user: {
    id: number
    login: string
  }
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    healthCheck: build.query<HealthResponse, void>({
      query: () => API_ENDPOINTS.health,
    }),
    login: build.mutation<LoginResponse, LoginRequestBody>({
      query: (body) => ({
        url: API_ENDPOINTS.authLogin,
        method: HTTP_METHODS.post,
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useHealthCheckQuery, useLazyHealthCheckQuery, useLoginMutation } =
  authApi;
