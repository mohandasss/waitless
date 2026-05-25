import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosRequestHeaders,
	type Method,
	type ResponseType,
	type HttpStatusCode,
} from "axios";

/**
 * Backend API response shape
 */
export interface ServerResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

/**
 * Final wrapper response shape
 */
export interface HttpResponse<T> {
	data: T | null;
	status: HttpStatusCode | number;
	statusText: string;
	headers: Record<string, string>;
	success: boolean;
	message: string;
}

type ClientConfig = AxiosRequestConfig & {
	url?: string;
	method?: Method;
};

const defaultBaseURL =
	import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export class AxiosWrapper {
	private readonly client: AxiosInstance;
	private readonly baseConfig: ClientConfig;
	private config: ClientConfig;

	constructor(baseURL: string = defaultBaseURL) {
		this.client = axios.create({
			baseURL,
			withCredentials: true,
			headers: {
				Accept: "application/json",
			},
		});

		this.baseConfig = {
			baseURL,
			method: "GET",
			headers: {
				Accept: "application/json",
			},
		};

		this.config = { ...this.baseConfig };

		/**
		 * Optional response interceptor
		 */
		this.client.interceptors.response.use(
			(response) => response,
			(error) => Promise.reject(error)
		);
	}

	path(pathname: string): AxiosWrapper {
		this.config.url = pathname;
		return this;
	}

	method(method: Method): AxiosWrapper {
		this.config.method = method;
		return this;
	}

	json(data: unknown): AxiosWrapper {
		this.config.data = data;

		this.config.headers = {
			...this.config.headers,
			"Content-Type": "application/json",
		};

		return this;
	}

	form(data: FormData): AxiosWrapper {
		this.config.data = data;

		const headers = {
			...(this.config.headers || {}),
		} as AxiosRequestHeaders;

		/**
		 * Browser automatically sets multipart boundary
		 */
		if (headers["Content-Type"]) {
			delete headers["Content-Type"];
		}

		this.config.headers = headers;

		return this;
	}

	query(params: Record<string, unknown>): AxiosWrapper {
		this.config.params = params;
		return this;
	}

	header(key: string, value: string): AxiosWrapper {
		this.config.headers = {
			...this.config.headers,
			[key]: value,
		};

		return this;
	}

	responseType(type: ResponseType): AxiosWrapper {
		this.config.responseType = type;
		return this;
	}

	private cleanHeaders(headers: unknown): Record<string, string> {
		const result: Record<string, string> = {};

		if (!headers || typeof headers !== "object") {
			return result;
		}

		for (const [key, value] of Object.entries(
			headers as Record<string, unknown>
		)) {
			if (typeof value === "string") {
				result[key] = value;
			} else if (value != null) {
				result[key] = String(value);
			}
		}

		return result;
	}

	private resetConfigAfterCall() {
		const { baseURL } = this.config;

		this.config = {
			...this.baseConfig,
			baseURL,
		};
	}

	async execute<T = unknown>(): Promise<HttpResponse<T>> {
		try {
			const response =
				await this.client.request<ServerResponse<T>>(this.config);

			this.resetConfigAfterCall();

			return {
				data: response.data.data,
				success: response.data.success,
				message: response.data.message,
				status: response.status,
				statusText: response.statusText,
				headers: this.cleanHeaders(response.headers),
			};
		} catch (error: unknown) {
			this.resetConfigAfterCall();

			if (axios.isAxiosError(error)) {
				const response = error.response;

				/**
				 * No server response
				 */
				if (!response) {
					return {
						data: null,
						success: false,
						message: "Network Error",
						status: 0,
						statusText: "No Response",
						headers: {},
					};
				}

				const responseData =
					response.data as Partial<ServerResponse<T>>;

				return {
					data: responseData?.data ?? null,
					success: responseData?.success ?? false,
					message:
						responseData?.message ??
						"Something went wrong",
					status: response.status,
					statusText: response.statusText,
					headers: this.cleanHeaders(response.headers),
				};
			}

			return {
				data: null,
				success: false,
				message: "Unexpected Error",
				status: 0,
				statusText: "Unknown Error",
				headers: {},
			};
		}
	}
}

export const apiAgent = new AxiosWrapper();

export default apiAgent;