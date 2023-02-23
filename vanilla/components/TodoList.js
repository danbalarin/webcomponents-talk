const INITIAL_STATE = [
  { id: 1, text: "Learn React", completed: true },
  { id: 2, text: "Learn Vue", completed: false },
  { id: 3, text: "Learn Web Components", completed: false },
];

class TodoList extends HTMLElement {
  constructor() {
    super();

    this._todos = INITIAL_STATE;

    const template = document.getElementById("todo-list");
    const templateContent = template.content;

    const shadowRoot = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
        div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
        h2 { margin: 0 0 10px; }
        ul { margin: 0; }
        p { margin: 10px 0; }
    `;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(templateContent.cloneNode(true));

    this.onToggle = this.onToggle.bind(this);
    this.renderTodos = this.renderTodos.bind(this);

    this.renderTodos();
  }

  onToggle(id) {
    const todos = [...this.todos];
    const todo = todos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    this.todos = todos;
  }

  renderTodos() {
    const list = this.shadowRoot.querySelector("ul");
    list.innerHTML = "";

    this.todos.forEach((todo) => {
      const todoItem = document.createElement("todo-item");
      todoItem.setAttribute("text", todo.text);
      todoItem.setAttribute("completed", todo.completed);
      todoItem.addEventListener("click", () => this.onToggle(todo.id));
      list.appendChild(todoItem);
    });
  }

  get todos() {
    return this._todos;
  }

  set todos(todos) {
    this._todos = todos;
    this.renderTodos();
  }
}

customElements.define("todo-list", TodoList);
