import axios, { AxiosError, AxiosInstance } from "axios";
import { getToken, clearAll } from "../utils/storage.util";
import { extractErrorMessage } from "../utils/error.util";
import type { ApiError } from "../types";
import { HTTP_STATUS } from "../transversal/components/constants/api.constants";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function createAxiosInstance(withAuth: boolean): AxiosInstance {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (withAuth) {
    instance.interceptors.request.use((config) => {
      const token = getToken();
      if (token) {
        config.headers = config.headers ?? {} as any;
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
      const statusCode = error.response?.status ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;
      const responseData: any = error.response?.data ?? {};
      const message =
        responseData.message ||
        responseData.error ||
        extractErrorMessage(error) ||
        "An unknown error occurred";

      const apiError: ApiError = {
        message,
        statusCode,
        error: responseData.error,
      };

      if (statusCode === HTTP_STATUS.UNAUTHORIZED) {
        clearAll();
      }

      return Promise.reject(apiError);
    }
  );

  return instance;
}

export const httpClient: AxiosInstance = createAxiosInstance(false);
export const authHttpClient: AxiosInstance = createAxiosInstance(true);