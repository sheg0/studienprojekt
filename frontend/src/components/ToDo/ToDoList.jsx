import React, { useEffect, useState } from "react";
import styles from "./ToDoList.module.css";

const ToDoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/to_do"); // Dummy-ID oder anpassen
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error("Fehler beim Laden der To-Dos:", err);
    }
  };

  const addTodo = async () => {
    if (!input.trim()) return;

    try {
      await fetch("http://localhost:3000/api/to_do", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: input }),
      });
      setInput("");
      fetchTodos();
    } catch (err) {
      console.error("Fehler beim Hinzufügen:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/to_do/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📝 To-Do Liste</h2>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Neue Aufgabe..."
          className={styles.inputField}
        />
        <button onClick={addTodo} className={styles.addButton}>
          ➕
        </button>
      </div>

      {todos.length === 0 ? (
        <p>Keine Aufgaben vorhanden.</p>
      ) : (
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              <span className={styles.todoTitle}>{todo.title}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className={styles.deleteButton}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoList;
