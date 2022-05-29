import { ApiHelper } from "./serverConnections";

const api = new ApiHelper({
	baseURL: "http://localhost:7576",
	timeout: 10000,
});

export default api;
