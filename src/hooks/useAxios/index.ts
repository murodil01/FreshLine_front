/*import axios from "axios";
import type { Method, AxiosRequestConfig, AxiosResponse } from "axios";

interface RequestProps {
  url: string;
  method: Method;
  body?: object;
  params?: Record<string, string | number>;
}

export const useAxios = () => {
  const request = async <TResponse>(props: RequestProps): Promise<TResponse> => {
    const { url, method, body, params } = props;

    const config: AxiosRequestConfig = {
      url: `/api/${url}`,
      method,
      data: body,
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    };

    const response: AxiosResponse<TResponse> = await axios(config);
    return response.data;
  };

  return request;
};*/
import axios from "axios";
import type { Method, AxiosRequestConfig, AxiosResponse } from "axios";

interface RequestProps {
  url: string;
  method: Method;
  body?: object;
  params?: Record<string, string | number>;
}

const BASE_URL = import.meta.env.DEV
  ? "/api" 
  : import.meta.env.VITE_API_BASE_URL; 

export const useAxios = () => {
  const request = async <TResponse>(props: RequestProps): Promise<TResponse> => {
    const { url, method, body, params } = props;

    const config: AxiosRequestConfig = {
      url: `${BASE_URL}/${url}`,
      method,
      data: body,
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    };

    const response: AxiosResponse<TResponse> = await axios(config);
    return response.data;
  };

  return request;
};
