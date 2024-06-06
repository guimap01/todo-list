import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import TodoProvider from './TodoContext';
import Todo from './Todo';
import '../test/mocks/mockLocalStorage';

describe('Todo Component', () => {
  function renderComponent() {
    render(
      <TodoProvider>
        <Todo />
      </TodoProvider>
    );
  }

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should renders the Todo component', () => {
    renderComponent();
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  it('should add a new todo', async () => {
    renderComponent();

    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, 'New Todo');
    await userEvent.click(addButton);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  it('shoudl toggle todo completion', async () => {
    renderComponent();

    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, 'New Todo');
    await userEvent.click(addButton);

    const todoItem = screen.getByText('New Todo');
    expect(todoItem).not.toHaveClass('line-through');

    const todoItemCheckbox = screen.getByRole('checkbox');
    await userEvent.click(todoItemCheckbox);
    expect(todoItem).toHaveClass('line-through');

    await userEvent.click(todoItemCheckbox);
    expect(todoItem).not.toHaveClass('line-through');
  });

  it('shoudl removes a todo', async () => {
    renderComponent();

    const input = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', { name: /add/i });

    await userEvent.type(input, 'New Todo');
    await userEvent.click(addButton);

    expect(screen.queryByText('New Todo')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: /remove/i });

    await userEvent.click(removeButton);

    expect(screen.queryByText('New Todo')).not.toBeInTheDocument();
  });
});
