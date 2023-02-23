class TodoItem extends HTMLElement {
  static get observedAttributes() {
    return ["text", "completed"];
  }
  constructor() {
    super();

    const template = document.getElementById("todo-item");
    const templateContent = template.content;

    const shadowRoot = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
        li {
            list-style: none;
            margin: 0.5rem 0;
            padding: 0.5rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-shadow: 0 2px 3px #ccc;
            width: 16rem;
            cursor: pointer;
        }
        
        li.completed {
            text-decoration: line-through;
            background-color: #eee;
        }
      `;

    shadowRoot.appendChild(style);
    shadowRoot.appendChild(templateContent.cloneNode(true));

    this.onTextChange = this.onTextChange.bind(this);
    this.onCompletedChange = this.onCompletedChange.bind(this);

    this.onTextChange();
  }

  onTextChange() {
    this.shadowRoot.querySelector("li").textContent = this.text;
  }

  onCompletedChange() {
    const li = this.shadowRoot.querySelector("li");
    if (this.completed) {
      li.classList.add("completed");
    } else {
      li.classList.remove("completed");
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    switch (name) {
      case "text":
        this.text = newValue;
        this.onTextChange();
        break;
      case "completed":
        this.completed = newValue === "true";
        this.onCompletedChange();
        break;
      default:
        break;
    }
  }
}

customElements.define("todo-item", TodoItem);
