import { describe, it, expect, beforeEach } from 'vitest';
import {
  getTodos,
  setTodos,
  addTodo,
  updateTodo,
  removeTodo,
  Todo,
} from './localStorage';
import '../test/mocks/mockLocalStorage';

describe('Todo Utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const sampleTodo: Todo = { value: 'Sample Todo', completed: false };

  it('should return an empty array if no todos are in localStorage', () => {
    expect(getTodos()).toEqual([]);
  });

  it('should set and get todos from localStorage', () => {
    setTodos([sampleTodo]);
    expect(getTodos()).toEqual([sampleTodo]);
  });

  it('should add a todo to the list', () => {
    addTodo(sampleTodo);
    expect(getTodos()).toEqual([sampleTodo]);
  });

  it('should update a todo in the list', () => {
    setTodos([sampleTodo]);
    const updatedTodo: Todo = { value: 'Updated Todo', completed: true };
    updateTodo(0, updatedTodo);
    expect(getTodos()).toEqual([updatedTodo]);
  });

  it('should remove a todo from the list', () => {
    setTodos([sampleTodo]);
    removeTodo(0);
    expect(getTodos()).toEqual([]);
  });

  it('should handle errors gracefully in getTodos', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => {
          throw new Error('Error in getItem');
        },
        clear: () => {},
      },
    });

    expect(getTodos()).toEqual([]);
  });

  it('should handle errors gracefully in setTodos', () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: () => {
          throw new Error('Error in setItem');
        },
        clear: () => {},
      },
    });

    expect(() => setTodos([sampleTodo])).not.toThrow();
  });
});
