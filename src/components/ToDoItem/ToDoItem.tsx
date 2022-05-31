import { Button } from "@mui/material";
import React from "react";
import { DeleteToDoItemRequest } from "../../api/requests/todo";
import UpdateModal from "../UpdateModal/UpdateModal";
import "./ToDoItem.css";

interface ToDoItemProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  refreshOnDelete: () => void;
  refreshOnUpdate: () => void;
}

const ToDoItem: React.FunctionComponent<ToDoItemProps> = ({
  id,
  title,
  description,
  dueDate,
  refreshOnDelete,
  refreshOnUpdate,
}) => {
  async function handleDelete(event: any) {
    event.preventDefault();
    const responseResult = await DeleteToDoItemRequest(id);
    if (responseResult === true) {
      refreshOnDelete();
    } else {
      console.log(responseResult);
    }
  }

  return (
    <div className="todo">
      <h6>{title}</h6>
      <p>{description}</p>
      <p>
        {dueDate.split("T")[0] + " - " + dueDate.split("T")[1].split(".")[0]}
      </p>
      <Button onClick={handleDelete}>DELETE</Button>
      <UpdateModal id={id} refreshOnUpdate={refreshOnUpdate} />
    </div>
  );
};

export default ToDoItem;
