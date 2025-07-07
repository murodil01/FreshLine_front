import axios from "axios";
import type { Method, AxiosRequestConfig, AxiosResponse } from "axios";

interface RequestProps {
  url: string;
  method: Method;
  body?: object;
  params?: Record<string, string | number>;
}

export const useAxios = () => {
  const request = async <TResponse>(
    props: RequestProps
  ): Promise<TResponse> => {
    const { url, method, body, params } = props;

    const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, ""); // oxirgi / larni olib tashlaydi
    const finalUrl = `${baseUrl}/${url.replace(/^\/+/, "")}`; // boshlang‘ich / larni olib tashlaydi

    const config: AxiosRequestConfig = {
      url: finalUrl,
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
