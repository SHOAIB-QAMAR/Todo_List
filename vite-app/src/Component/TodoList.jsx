import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import './TodoList.css';

export default function TodoList() {
    let [todos, setTodo] = useState([{ task: "sample task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        setTodo((prevTodo) => {
            return [...prevTodo, { task: newTodo, id: uuidv4(), isDone: false }];
        });
        setNewTodo("");
    }
    const deleteTodo = (id) => {
        setTodo((prevTodos) => prevTodos.filter((todo) => todo.id != id));
    };

    const upperCaseTodo = (id) => {
        setTodo((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id == id) {
                    return {
                        ...todo,
                        task:
                            todo.task === todo.task.toUpperCase()
                                ? todo.task.toLowerCase()
                                : todo.task.toUpperCase()
                    }
                }
                else {
                    return todo;
                }
            })
        )
    }

    const toggleAllDone = () => {
        const allDone = todos.every((todo) => todo.isDone);
        setTodo((prevTodos) =>
            prevTodos.map((todo) => ({
                ...todo,
                isDone: !allDone,
            }))
        );
    };

    const toggleDone = (id) => {
        setTodo((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id
                    ? { ...todo, isDone: !todo.isDone }
                    : todo
            )
        );
    };

    return (
        <div className="diary">
            <h2 className="heading">📝 Todo List</h2>
            <div className="input-row">
                <input
                    className="task-input"
                    type="text"
                    placeholder="Add a task"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button className="add-btn" onClick={addNewTask}>Add Task</button>
            </div>
            <ul className="task-list">
                {todos.map(todo => (
                    <li key={todo.id} className="task-item">
                        <span
                            className={`task-text ${todo.isDone ? 'done' : ''}`}
                        >
                            {todo.task}
                        </span>
                        <div className="actions">
                            <button className="icon-btn" onClick={() => deleteTodo(todo.id)}>🗑️</button>
                            <button className="icon-btn" onClick={() => upperCaseTodo(todo.id)}>🔁</button>
                            <button className="icon-btn" onClick={() => toggleDone(todo.id)}>
                                {todo.isDone ? "↩️" : "✅"}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="footer">
                <button className="toggle-btn" onClick={toggleAllDone}>
                    {todos.every(todo => todo.isDone) ? "↩️ Undo All" : "✅ Mark All as Done"}
                </button>
            </div>
        </div>

    );
}