import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_TAGS } from '@/shared/constants';

import { apiBaseUrl } from './apiBaseUrl';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiBaseUrl()}/api`,
    prepareHeaders: (headers) => {
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      return headers;
    },
  }),
  tagTypes: [API_TAGS.TASKS],
  endpoints: () => ({}),
});
