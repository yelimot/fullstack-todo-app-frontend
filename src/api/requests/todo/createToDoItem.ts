import {
	IResponse,
	ICreateToDo,
} from "../../../interfaces/interfaces";
import api from "../../index";

const createToDoItem = async (toDoItem: ICreateToDo) => {
	const path = "/api/v1/todos";
	// const path = "/todo"; // mock api's path
	return api.POST(path, toDoItem).then((result: IResponse) => {
		if (result.success) {
			return true;
		}
		return result.error;
	});
};

export default createToDoItem;
