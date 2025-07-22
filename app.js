const todos = [{ task: "sample task", id: generateId(), isDone: false }];

const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const toggleAllBtn = document.getElementById("toggle-all-btn");

function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function renderTodos() {
    list.innerHTML = "";
    todos.forEach((todo) => {
        const li = document.createElement("li");
        li.className = "task-item";

        const span = document.createElement("span");
        span.className = `task-text ${todo.isDone ? "done" : ""}`;
        span.textContent = todo.task;

        const actions = document.createElement("div");
        actions.className = "actions";

        const delBtn = document.createElement("button");
        delBtn.className = "icon-btn";
        delBtn.textContent = "🗑️";
        delBtn.onclick = () => {
            deleteTodo(todo.id);
        };

        const caseBtn = document.createElement("button");
        caseBtn.className = "icon-btn";
        caseBtn.textContent = "🔁";
        caseBtn.onclick = () => {
            toggleCase(todo.id);
        };

        const toggleBtn = document.createElement("button");
        toggleBtn.className = "icon-btn";
        toggleBtn.textContent = todo.isDone ? "↩️" : "✅";
        toggleBtn.onclick = () => {
            toggleDone(todo.id);
        };

        actions.append(delBtn, caseBtn, toggleBtn);
        li.append(span, actions);
        list.appendChild(li);
    });

    updateToggleAllBtn();
}

function addTodo() {
    const value = input.value.trim();
    if (value === "") return;
    todos.push({ task: value, id: generateId(), isDone: false });
    input.value = "";
    renderTodos();
}

function deleteTodo(id) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        renderTodos();
    }
}

function toggleCase(id) {
    todos.forEach((todo) => {
        if (todo.id === id) {
            todo.task =
                todo.task === todo.task.toUpperCase()
                    ? todo.task.toLowerCase()
                    : todo.task.toUpperCase();
        }
    });
    renderTodos();
}

function toggleDone(id) {
    todos.forEach((todo) => {
        if (todo.id === id) {
            todo.isDone = !todo.isDone;
        }
    });
    renderTodos();
}

function toggleAllDone() {
    const allDone = todos.every((todo) => todo.isDone);
    todos.forEach((todo) => {
        todo.isDone = !allDone;
    });
    renderTodos();
}

function updateToggleAllBtn() {
    const allDone = todos.every((todo) => todo.isDone);
    toggleAllBtn.textContent = allDone ? "↩️ Undo All" : "✅ Mark All as Done";
}

addBtn.addEventListener("click", addTodo);
toggleAllBtn.addEventListener("click", toggleAllDone);

renderTodos();