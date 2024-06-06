export interface Todo {
  value: string;
  completed: boolean;
}

const TODOS_KEY = 'todos';

export const getTodos = (): Todo[] => {
  try {
    const todos = localStorage.getItem(TODOS_KEY);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Failed to get todos from localStorage:', error);
    return [];
  }
};

export const setTodos = (todos: Todo[]): void => {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to set todos in localStorage:', error);
  }
};

export const addTodo = (todo: Todo): void => {
  try {
    const todos = getTodos();
    todos.push(todo);
    setTodos(todos);
  } catch (error) {
    console.error('Failed to add todo to localStorage:', error);
  }
};

export const updateTodo = (index: number, updatedTodo: Todo): void => {
  try {
    const todos = getTodos();
    todos[index] = updatedTodo;
    setTodos(todos);
  } catch (error) {
    console.error('Failed to update todo in localStorage:', error);
  }
};

export const removeTodo = (index: number): void => {
  try {
    const todos = getTodos();
    todos.splice(index, 1);
    setTodos(todos);
  } catch (error) {
    console.error('Failed to remove todo from localStorage:', error);
  }
};
