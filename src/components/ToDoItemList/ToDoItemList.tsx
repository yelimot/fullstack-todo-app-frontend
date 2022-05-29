import React, { useEffect, useState } from "react";
import { IToDo } from "../../interfaces/interfaces";
import ToDoItem from "../ToDoItem/ToDoItem";
import TablePagination from "@mui/material/TablePagination";
import "./ToDoItemList.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GetAllToDoItemsRequest } from "../../api/requests/todo";

interface IToDoList {
  isRefresh: boolean;
  setIsRefresh: (val: boolean) => void;
}
const ToDoItemList: React.FunctionComponent<IToDoList> = ({
  isRefresh,
  setIsRefresh,
}) => {
  const [toDoItems, setToDoItems] = useState<Array<IToDo>>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sortOption, setSortOption] = useState<string>("desc");
  const [sortValue, setSortValue] = useState<string>("dueDate");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    (async () => {
      await init();
    })();
  }, [pageNo, rowsPerPage, sortOption, sortValue, isRefresh]);

  const init = async () => {
    const responseResult: any = await GetAllToDoItemsRequest(
      pageNo,
      rowsPerPage,
      sortValue, // Sort By which Value
      sortOption, // Sort By what Option,
      searchQuery
    );
    if (responseResult instanceof Array) {
      setToDoItems(responseResult);
      setIsRefresh(false);
    } else {
      console.log(responseResult);
    }
  };

  const handleChangeSortOption = (event: SelectChangeEvent) => {
    setSortOption(event.target.value as string);
  };

  const handleChangeSortValue = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as string);
  };

  const handleChangePageNo = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPageNo(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNo(1);
  };

  function handleChangeSearch(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearchQuery(event.target.value);
  }

  function handleSearchSubmit(event: any) {
    event.preventDefault();
    init();
  }

  return (
    <div className="list">
      <div>
        <div className="options">
          <form className="searchForm" onSubmit={handleSearchSubmit}>
            <input
              className="search"
              type="text"
              value={searchQuery}
              placeholder="Enter here..."
              onChange={handleChangeSearch}
            />
            <button type="submit">Search</button>
          </form>
          <div className="sort">
            <Box sx={{ minWidth: 60 }}>
              <FormControl fullWidth>
                <InputLabel id="sort-option-select-label">
                  Sort Option
                </InputLabel>
                <Select
                  labelId="sort-option-select-label"
                  id="sort-option-select"
                  value={sortOption}
                  label="Sort Option"
                  onChange={handleChangeSortOption}
                >
                  <MenuItem value={"asc"}>Ascending</MenuItem>
                  <MenuItem value={"desc"}>Descending</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 60 }}>
              <FormControl fullWidth>
                <InputLabel id="sort-value-select-label">Sort Value</InputLabel>
                <Select
                  labelId="sort-value-select-label"
                  id="sort-value-select"
                  value={sortValue}
                  label="Sort Value"
                  onChange={handleChangeSortValue}
                >
                  <MenuItem value={"title"}>Title</MenuItem>
                  <MenuItem value={"description"}>Description</MenuItem>
                  <MenuItem value={"dueDate"}>Due Date</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        {toDoItems.map((item: IToDo, i) => (
          <ToDoItem
            key={i}
            description={item.description}
            title={item.title}
            dueDate={item.dueDate}
            id={item.id}
            refreshOnDelete={() => init()}
            refreshOnUpdate={() => init()}
          />
        ))}
      </div>
      <TablePagination
        component="div"
        count={100}
        page={pageNo - 1}
        onPageChange={handleChangePageNo}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ToDoItemList;
