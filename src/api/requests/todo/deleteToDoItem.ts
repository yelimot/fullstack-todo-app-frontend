import {
	IResponse,
} from "../../../interfaces/interfaces";
import api from "../../index";

const deleteToDoItem = async (id: number) => {
	const path = "/api/v1/todos/" + id;
	return api.DELETE(path).then((result: IResponse) => {
		if (result.success) {
			return true;
		}
		return result.error;
	});
};

export default deleteToDoItem;