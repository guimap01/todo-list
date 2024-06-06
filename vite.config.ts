/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
