import {
	IResponse
} from "../../../interfaces/interfaces";
import api from "../../index";

const getById = async (id: number) => {
	const path = "/api/v1/todos/" + id;
	return api.GET(path).then((result: IResponse) => {
		if (result.success) {
			return result.data;
		}
		return result.error;
	});
};

export default getById;
