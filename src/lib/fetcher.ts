import { config } from "@/config";
import { FetchingError } from "@/lib/errors";
import { refreshAccessToken } from "@/lib/auth";

type Fetcher = {
  get(resource: string, options?: RequestInit): Promise<any>;
  post(resource: string, body: any, options?: RequestInit): Promise<any>;
  setToken(token: string): void;
}

let token: string;
const Fetcher = (baseUrl: string): Fetcher => {
  const setToken = (t: string) => {
    token = t;
    localStorage.setItem("token", t);
  };
  const makeRequest = async (method: string, resource: string, options?: RequestInit, body?: any): Promise<any> => {
    resource = filterResourceString(resource);
    const requestOptions: RequestInit = {
      credentials: "include",
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token || localStorage.getItem("token")}`,
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    };

    const response = await fetch(`${baseUrl}${resource}`, requestOptions);

    if (response.status === 401) {
      const res = await refreshAccessToken();
      if (res.ok && response.status !== 401) {
        return makeRequest(method, resource, options, body);
      } else {
        window.location.href = "/login";

      }

    }


    if (!response.ok) {
      const errorBody = await response.json();
      throw new FetchingError(response.status, `Failed to ${method.toLowerCase()}`, errorBody);
    }
    return await response.json();
  };

  const get = async (resource: string, options?: RequestInit): Promise<any> => {
    return makeRequest("GET", resource, options);
  };

  const post = async (resource: string, body: any, options?: RequestInit): Promise<any> => {
    return makeRequest("POST", resource, options, body);
  };

  return { get, post, setToken };
};

const filterResourceString = (resource: string) => {
  if (resource.slice(0, 1) !== "/") {
    return `/${resource}`;
  }
  return resource;
};

const fetcher = Fetcher(config.BACKEND_URL);


export { fetcher };