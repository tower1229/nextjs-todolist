let todos: Todo[] = [];
let nextId = 1;

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
  return todos;
};

export const addTodo = async (text: string): Promise<void> => {
  const newTodo: Todo = {
    id: nextId++,
    text,
    completed: false,
  };
  todos.push(newTodo);
};

export const updateTodo = async (
  id: number,
  updates: Partial<Todo>,
): Promise<void> => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updates };
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  todos = todos.filter((todo) => todo.id !== id);
};
