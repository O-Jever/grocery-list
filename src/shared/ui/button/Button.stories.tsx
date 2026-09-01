import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Войти',
    variant: 'primary',
    disabled: false,
  },
  argTypes: {
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    variant: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const LongLabel: Story = {
  args: {
    children: 'Добавить новый продукт в список покупок',
  },
};
