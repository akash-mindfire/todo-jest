import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox, IconButton, TextField } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { toggleTodo, deleteTodo, editTodo } from "../src/Store/todoSlice";

interface TodoProps {
  id: number;
  text: string;
  completed: boolean;
}

const Todo: React.FC<TodoProps> = ({ id, text, completed }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleCheckboxChange = () => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodo(id));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editedText.trim() !== "") {
      dispatch(
        editTodo({
          id,
          text: editedText.trim(),
        })
      );
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(text);
  };

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <TextField value={editedText} onChange={handleChangeText} />
          <IconButton onClick={handleSaveClick}>Save</IconButton>
          <IconButton onClick={handleCancelClick}>Cancel</IconButton>
        </div>
      ) : (
        <div>
          <Checkbox
            checked={completed}
            onChange={handleCheckboxChange}
            inputProps={{ "aria-label": "checkbox" }}
          />
          {text}
          <IconButton onClick={handleDeleteClick}>
            <Delete />
          </IconButton>
          <IconButton onClick={handleEditClick}>Edit</IconButton>
        </div>
      )}
    </div>
  );
};

export default Todo;
