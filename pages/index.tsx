import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../src/Store";
import { addTodo } from "../src/Store/todoSlice";
import Todo from "../components/Todo";

const Home: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
  };

  const handleAddClick = () => {
    if (newTodoText.trim() !== "") {
      dispatch(addTodo(newTodoText.trim()));
      setNewTodoText("");
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input type="text" value={newTodoText} onChange={handleInputChange} />
        <button onClick={handleAddClick}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo id={todo.id} text={todo.text} completed={todo.completed} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
