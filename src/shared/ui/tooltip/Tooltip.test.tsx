import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('renders tooltip content', () => {
    render(
      <Tooltip content="Удалить продукт">
        <button type="button">Удалить</button>
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip')).toHaveTextContent('Удалить продукт');
    expect(screen.getByRole('button', { name: 'Удалить' })).toBeInTheDocument();
  });
});