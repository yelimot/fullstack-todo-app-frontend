import { ApiHelper } from "./serverConnections";

const api = new ApiHelper({
	baseURL: "http://ec2-54-164-28-168.compute-1.amazonaws.com:7576",
	timeout: 10000,
});

export default api;
