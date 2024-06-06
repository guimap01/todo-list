import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'todoList',
      filename: 'remoteEntry.js',
      exposes: {
        './Todo': './src/todo/Todo.tsx',
        './TodoProvider': './src/todo/TodoContext.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',

    minify: false,
    cssCodeSplit: false,
  },
});
