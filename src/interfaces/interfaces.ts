export interface FileProps {
	uri: string;
	type: string;
	name: string;
}

export interface ItemProps {
	name: string;
	size: string;
	type: string;
}

export interface IResponse {
	data: any;
	error?: string;
	success: boolean;
	status: number;
}

export interface ICreateToDo {
	title: string;
	description: string;
	dueDate: string;
}

export interface IUpdateToDo {
	id: number;
	title: string;
	description: string;
	dueDate: string;
}

export interface IToDo {
	id: number;
	title: string;
	description: string;
	dueDate: string;
}

export interface IGetAllToDos {
	todos: Array<IToDo>;
}

export interface IGetByFilterToDos {
	todos: Array<IToDo>;
}