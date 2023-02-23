import { useState } from "react";
import { TodoItem } from "./TodoItem";

const INITIAL_STATE = [
  { id: 1, text: "Learn React", completed: true },
  { id: 2, text: "Learn Vue", completed: false },
  { id: 3, text: "Learn Web Components", completed: false },
];

export function TodoList() {
  const [todos, setTodos] = useState(INITIAL_STATE);

  const toggleTodo = (id) => {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={() => toggleTodo(todo.id)}
        />
      ))}
    </ul>
  );
}
