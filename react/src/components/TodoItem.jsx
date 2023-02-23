import "./TodoItem.css";

export function TodoItem({ text, completed, onToggle }) {
  return (
    <li onClick={onToggle} className={completed ? "completed" : ""}>
      {text}
    </li>
  );
}
