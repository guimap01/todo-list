# Todo List Microfrontend
This repository contains a Todo List application built as a microfrontend using React, TypeScript, Vite, and Module Federation.

## Prerequisites
* Node.js
* Yarn
## Installation
1. Clone the repository:

```bash
git clone https://github.com/guimap01/todo-list.git
cd todo-list
```
2. Install dependencies for the microfrontend app:

```bash
cd todo-list-microfrontend
yarn install
```

## Running the Applications

1. Directly using the App

```bash
yarn dev
```

2. Consuming MFE
To consume the app as a MFE you will need to first build
```bash
yarn build
```

then run the preview script
```bash
yarn preview
```

The App can be consumed in the followind URL:
```bash
http://localhost:3000/assets/remoteEntry.js
```

This App will export two Component
* Todo - The `Todo` component 
* TodoProvider - The `TodoProvider` component handles all the functionality of the Todo app and exposes a hook called `useTodos` which provides access to the following methods and values: `todos`, `addTodo`, `toggleTodoCompletion`, `removeTodo`, `error` 
