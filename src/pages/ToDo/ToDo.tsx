import { useState } from "react";
import CreateToDoItem from "../../components/CreateToDoItem/CreateToDoItem";
import Header from "../../components/Header/Header";
import ToDoItemList from "../../components/ToDoItemList/ToDoItemList";
import "./ToDo.css";

function ToDo() {
  const [isRefresh, setIsRefresh] = useState(false);
  return (
    <div className="SinglePageAppToDo">
      <Header />
      <CreateToDoItem setIsRefresh={setIsRefresh} />
      <ToDoItemList isRefresh={isRefresh} setIsRefresh={setIsRefresh} />
    </div>
  );
}

export default ToDo;
