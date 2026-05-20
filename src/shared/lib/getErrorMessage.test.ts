import { describe, expect, it } from 'vitest';

import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage', () => {
  it('returns message from error data', () => {
    const error = {
      data: {
        message: 'Пользователь не найден',
      },
    };
    expect(getErrorMessage(error, 'Ошибка загрузки')).toBe('Пользователь не найден');
  });

  it('returns fallback for unknown error format', () => {
    expect(getErrorMessage(new Error('Network error'), 'Ошибка загрузки')).toBe(
      'Ошибка загрузки',
    );
  });

  it('returns fallback when data message is not a string', () => {
    const error = {
      data: {
        message: 500,
      },
    };
    expect(getErrorMessage(error, 'Ошибка загрузки')).toBe('Ошибка загрузки');
  });
});