import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type SessionUser = {
  login: string
}

type SessionState = {
  user: SessionUser | null
}

const STORAGE_KEY = 'frh_session_user';

function readStoredUser(): SessionUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === 'object' &&
      'login' in parsed &&
      typeof (parsed as { login: unknown }).login === 'string'
    ) {
      return { login: (parsed as { login: string }).login };
    }
  } catch {
    //emty
  }
  return null;
}

function persistUser(user: SessionUser | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ login: user.login }));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

const initialState: SessionState = {
  user: readStoredUser(),
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SessionUser>) {
      state.user = action.payload;
      persistUser(action.payload);
    },
    logout(state) {
      state.user = null;
      persistUser(null);
    },
  },
});

export const { setUser, logout } = sessionSlice.actions;

export const selectSessionUser = (state: { session: SessionState }) =>
  state.session.user;

export const selectIsAuthenticated = (state: { session: SessionState }) =>
  Boolean(state.session.user);
