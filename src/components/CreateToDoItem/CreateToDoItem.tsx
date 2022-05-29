import React, { ChangeEvent, useState } from "react";
import { ICreateToDo } from "../../interfaces/interfaces";
import TextField from "@mui/material/TextField";
import "./CreateToDoItem.css";
import { CreateToDoItemRequest } from "../../api/requests/todo";

interface ICreateToDoItem {
  setIsRefresh: (val: boolean) => void;
}

function CreateToDoItem({ setIsRefresh }: ICreateToDoItem) {
  const [toDoItem, setToDoItem] = useState<ICreateToDo>({
    title: "",
    description: "",
    dueDate: new Date().toISOString().split(".")[0],
  });

  function handleChange(event: any) {
    const { name, value } = event.target;
    setToDoItem((prevToDoItem) => {
      return {
        ...prevToDoItem,
        [name]: value,
      };
    });
  }

  function handleDateChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setToDoItem({ ...toDoItem, dueDate: event.target.value });
  }

  async function handleCreate(event: any) {
    event.preventDefault();
    const responseResult = await CreateToDoItemRequest({
      ...toDoItem,
      dueDate: new Date(toDoItem.dueDate).toISOString(),
    });
    if (responseResult === true) {
      setToDoItem({
        title: "",
        description: "",
        dueDate: new Date().toISOString().split(".")[0],
      });
      setIsRefresh(true);
    } else {
      console.log(responseResult);
    }
  }

  return (
    <>
      <form className="createForm" onSubmit={handleCreate}>
        <input
          name="title"
          onChange={handleChange}
          value={toDoItem.title}
          placeholder="Title"
        />
        <textarea
          name="description"
          onChange={handleChange}
          value={toDoItem.description}
          placeholder="Description..."
        />
        <TextField
          id="dueDate"
          label="Due Date"
          type="datetime-local"
          value={
            toDoItem.dueDate === ""
              ? new Date().toISOString().split(".")[0]
              : toDoItem.dueDate
          }
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleDateChange}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default CreateToDoItem;
