import { Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetByIdRequest, UpdateToDoItemRequest } from "../../api/requests/todo";
import { IUpdateToDo } from "../../interfaces/interfaces";
import "./UpdateModal.css";

interface UpdateModalProps {
  id: number;
  refreshOnUpdate: () => void;
}

const UpdateModal: React.FunctionComponent<UpdateModalProps> = ({
  id,
  refreshOnUpdate,
}) => {
  const [toDoItem, setToDoItem] = useState<IUpdateToDo>({
    id: id,
    title: "",
    description: "",
    dueDate: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    (async () => {
      if (open) {
        await init();
      }
    })();
  }, [id, open]);

  const init = async () => {
    const responseResult: any = await GetByIdRequest(id);
    console.log(responseResult.dueDate.split(".")[0], responseResult.dueDate);
    if (responseResult instanceof Object) {
      setToDoItem(responseResult);
    } else {
      console.log(responseResult);
    }
  };

  function handleChange(event: any) {
    const { name, value } = event.target;

    setToDoItem((prevToDoItem) => {
      return {
        ...prevToDoItem,
        [name]: value,
      };
    });
  }

  function handleDateChange(event: any) {
    setToDoItem({ ...toDoItem, dueDate: event.target.value });
  }

  async function handleUpdate(event: any) {
    event.preventDefault();
    event.stopPropagation(); // bunu araştır
    event.cancelBuble = true; // bunu araştır
    const responseResult = await UpdateToDoItemRequest({
      ...toDoItem,
    });
    if (responseResult === true) {
      refreshOnUpdate();
    } else {
      console.log(responseResult);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>Update</Button>
      <Modal open={open} onClose={handleClose}>
        <form className="updateForm" onSubmit={handleUpdate}>
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
                : toDoItem.dueDate.split(".")[0]
            }
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
          />
          <button type="submit">Update</button>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateModal;

// export default {};
