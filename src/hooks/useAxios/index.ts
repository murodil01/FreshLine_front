import axios, { Method, AxiosRequestConfig } from "axios";
import axios from 'axios'

interface RequestProps {
  url: string;
  method: Method;
  body?: any;
  params?: Record<string, any>;
}

export const useAxios = () => {
  const request = async <T = any>({
    url,
    method,
    body,
    params,
  }: RequestProps): Promise<T> => {
    const config: AxiosRequestConfig = {
      url: `${import.meta.env.VITE_BASE_URL}/${url}`,
      method,
      data: body,
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    return axios(config).then((res) => res.data.data);
  };

  return request;
};