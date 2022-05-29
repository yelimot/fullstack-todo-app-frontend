import axios, { AxiosInstance } from "axios";

export interface ApiHelperOptions {
	baseURL: string;
	timeout?: number;
}

export default class ApiHelper {
	api: AxiosInstance;
	token: string | null | undefined;
	lang!: string | null;

	constructor(options: ApiHelperOptions) {
		const { baseURL, timeout } = options;
		this.api = axios.create({
			baseURL,
			timeout,
			headers: { "Content-Type": "application/json" },
		});

		this.api.interceptors.request.use((prevConfig: any) => {
			const { ...config } = prevConfig;

			if (this.lang) {
				config.headers["Accept-Language"] = this.lang;
			}
			if (this.token) {
				config.headers.Authorization = this.token;
			}
			return config;
		});
	}

	// call this after login and application start
	setToken = (token: string, type = "Bearer"): void => {
		this.token = `${type} ${token}`;
	};

	// call this after the language changed and application start
	setLanguage = (lang: string): void => {
		this.lang = lang;
	};

	POST = (path: string, data: any, config?: {}) => {
		return this.api
			.post(path, data, config)
			.then((response: any) => {
				return this.controlResponse(response);
			})
			.catch((error: any) => {
				return this.catchHandler(error);
			});
	};

	DELETE = (path: string, config?: any) => {
		return this.api
			.delete(path, config)
			.then((response: any) => {
				return this.controlResponse(response);
			})
			.catch((error: any) => {
				return this.catchHandler(error);
			});
	};

	GET = (path: string, config?: {}) => {
		return this.api
			.get(path, config)
			.then((response: any) => {
				return this.controlResponse(response);
			})
			.catch((error: any) => {
				return this.catchHandler(error);
			});
	};

	PUT = (path: string, data: any, config?: {}) => {
		return this.api
			.put(path, data, config)
			.then((response: any) => {
				return this.controlResponse(response);
			})
			.catch((error: any) => {
				return this.catchHandler(error);
			});
	};

	PATCH = (path: string, data: any, config?: {}) => {
		return this.api
			.patch(path, data, config)
			.then((response: any) => {
				return this.controlResponse(response);
			})
			.catch((error: any) => {
				return this.catchHandler(error);
			});
	};

	catchHandler = (error: any) => {
		if (error?.response) {
			return this.controlResponse(error.response);
		}
		return {
			data: null,
			error: error.message,
			success: false,
			status: 500,
		};
	};

	controlResponse = async (response: any) => {
		if (200 <= response.status && response.status <= 206) {
			return {
				data: response.data,
				success: true,
				status: response.status,
			};
		}
		
		return {
			data: response.data,
			error:
					response?.data?.message !== undefined
					? response.data.message
					: "Error",
			success: false,
			status: response.status,
		};
	};
}
