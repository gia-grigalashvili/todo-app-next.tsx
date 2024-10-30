"use client"; // This marks the component as a client component

import React, { useEffect, useState } from "react";

// Placeholder API URL
const API_URL = "https://jsonplaceholder.typicode.com/todos";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Fetch initial todos from the API
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}?_limit=5`); // Limit to 5 todos
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const addTodo = async () => {
    if (inputValue.trim() === "") return;

    const newTodo = {
      title: inputValue,
      completed: false,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      setTodos((prevTodos) => [...prevTodos, data]);
      setInputValue("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <h1 className="text-2xl font-bold">Todo App</h1>
      <div className="flex gap-2">
        <input
          type="text"
          className="p-2 bg-gray-800 text-white rounded-md"
          placeholder="Enter a todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="p-2 bg-blue-600 text-white rounded-md"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <div className="w-full max-w-md">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center bg-red-500 p-2 mt-2 rounded-md"
          >
            <span className="text-white">{todo.title}</span>
            <button
              className="text-white bg-black p-1 rounded-md"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
