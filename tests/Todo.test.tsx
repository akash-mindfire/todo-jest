import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../src/Store/todoSlice";
import Todo from "../components/Todo";

const store = configureStore({
  reducer,
});

const setup = (id: number, text: string, completed: boolean) => {
  render(
    <Provider store={store}>
      <Todo id={id} text={text} completed={completed} />
    </Provider>
  );
};

test("renders todo item correctly", () => {
  setup(1, "Buy groceries", false);

  const todoText = screen.getByText("Buy groceries");
  expect(todoText).toBeInTheDocument();

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("calls toggleTodo when checkbox is clicked", () => {
  const toggleTodo = jest.fn();
  const deleteTodo = jest.fn();
  const editTodo = jest.fn();

  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => ({
      toggleTodo,
      deleteTodo,
      editTodo,
    }),
  }));

  setup(1, "Buy groceries", false);

  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  expect(toggleTodo).toHaveBeenCalledTimes(1);
  expect(toggleTodo).toHaveBeenCalledWith(1);
});

test("calls deleteTodo when delete button is clicked", () => {
  const toggleTodo = jest.fn();
  const deleteTodo = jest.fn();
  const editTodo = jest.fn();

  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => ({
      toggleTodo,
      deleteTodo,
      editTodo,
    }),
  }));

  setup(1, "Buy groceries", false);

  const deleteButton = screen.getByRole("button", { name: "Delete" });
  fireEvent.click(deleteButton);

  expect(deleteTodo).toHaveBeenCalledTimes(1);
  expect(deleteTodo).toHaveBeenCalledWith(1);
});

test("calls editTodo when edit button is clicked", () => {
  const toggleTodo = jest.fn();
  const deleteTodo = jest.fn();
  const editTodo = jest.fn();

  jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: () => ({
      toggleTodo,
      deleteTodo,
      editTodo,
    }),
  }));

  setup(1, "Buy groceries", false);

  const editButton = screen.getByRole("button", { name: "Edit" });
  fireEvent.click(editButton);

  expect(editTodo).toHaveBeenCalledTimes(1);
  expect(editTodo).toHaveBeenCalledWith({ id: 1, text: "Buy groceries" });
});
