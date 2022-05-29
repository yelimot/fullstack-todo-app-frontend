import { ApiHelper } from "./serverConnections";

const api = new ApiHelper({
	// baseURL: "https://62865f3a96bccbf32d742526.mockapi.io", // mock api's url
	baseURL: "http://localhost:7576",
	timeout: 3000,
});

export default api;
