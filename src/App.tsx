import Todo from './todo/Todo';
import TodoProvider from './todo/TodoContext';

export default function App() {
  return (
    <TodoProvider>
      <Todo />
    </TodoProvider>
  );
}
