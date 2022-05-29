import {
	IResponse,
	IUpdateToDo,
} from "../../../interfaces/interfaces";
import api from "../../index";

const updateToDoItem = async (toDoItem: IUpdateToDo) => {
	const path = "/api/v1/todos";
	return api.PUT(path, toDoItem).then((result: IResponse) => {
		if (result.success) {
			return true;
		}
		return result.error;
	});
};

export default updateToDoItem;
