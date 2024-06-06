import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  getTodos,
  setTodos,
  addTodo as addLocalTodo,
  updateTodo as updateLocalTodo,
  removeTodo as removeLocalTodo,
  Todo,
} from '../utils/localStorage';

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: string) => void;
  toggleTodoCompletion: (index: number) => void;
  removeTodo: (index: number) => void;
  error: string | null;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

interface TodoProviderProps {
  children: ReactNode;
}

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setLocalTodos] = useState<Todo[]>(getTodos);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setTodos(todos);
    } catch (error) {
      setError('Failed to save todos to localStorage');
    }
  }, [todos]);

  const addTodo = (value: string) => {
    if (value.trim()) {
      try {
        const newTodo: Todo = { value: value.trim(), completed: false };
        addLocalTodo(newTodo);
        setLocalTodos(getTodos());
      } catch (error) {
        setError('Failed to add todo');
      }
    } else {
      setError('Todo cannot be empty');
    }
  };

  const toggleTodoCompletion = (index: number) => {
    try {
      const todos = getTodos();
      todos[index].completed = !todos[index].completed;
      updateLocalTodo(index, todos[index]);
      setLocalTodos(getTodos());
    } catch (error) {
      setError('Failed to update todo');
    }
  };

  const removeTodo = (index: number) => {
    try {
      removeLocalTodo(index);
      setLocalTodos(getTodos());
    } catch (error) {
      setError('Failed to remove todo');
    }
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodoCompletion, removeTodo, error }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
