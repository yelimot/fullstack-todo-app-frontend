import {
	IResponse,
} from "../../../interfaces/interfaces";
import api from "../../index";

const getAllToDoItems = async (page:number, limit:number, sortBy:string, sortType:string, filter: string) => {
	const path = "/api/v1/todos?page=" + page + "&limit=" + limit + "&sortBy=" + sortBy + "&sortType=" + sortType + "&filter=" + filter;
	return api.GET(path).then((result: IResponse) => {
		if (result.success) {
			return result.data;
		}
		return result.error;
	});
};

export default getAllToDoItems;