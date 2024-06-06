import React, { useState } from 'react';
import { useTodos } from './TodoContext';

const Todo: React.FC = () => {
  const { todos, addTodo, toggleTodoCompletion, removeTodo, error } =
    useTodos();
  const [newTodo, setNewTodo] = useState<string>('');

  const handleAddTodo = () => {
    addTodo(newTodo.trim());
    setNewTodo('');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input
          type="text"
          className="border p-2 mr-2"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2" onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <ul className="">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex justify-between items-center mb-2 p-2 border"
          >
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoCompletion(index)}
              />
              <span className={`${todo.completed ? 'line-through' : ''}`}>
                {todo.value}
              </span>
            </div>
            <button
              className="bg-red-500 text-white p-2"
              onClick={() => removeTodo(index)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
