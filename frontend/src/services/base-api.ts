import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import { getToken } from "../utils/storage.util";
import type { ApiError } from "../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request if present
client.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function normalizeAxiosError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const axiosErr = err as AxiosError<any>;
    const resp = axiosErr.response;
    if (resp) {
      const data = resp.data;
      const message = data?.message ?? (typeof data === "string" ? data : resp.statusText);
      return {
        message: String(message ?? "API Error"),
        statusCode: resp.status,
        error: resp.statusText,
      };
    }
    return {
      message: axiosErr.message || "Network error",
      statusCode: 0,
    };
  }

  // Unknown error
  return {
    message: (err as any)?.message ?? "Unknown error",
    statusCode: 0,
  };
}

export async function get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    const { data } = await client.get<T>(url, config);
    return data;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
}

export async function post<T = any, R = any>(url: string, body?: T, config?: AxiosRequestConfig): Promise<R> {
  try {
    const { data } = await client.post<R>(url, body, config);
    return data;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
}

export async function put<T = any, R = any>(url: string, body?: T, config?: AxiosRequestConfig): Promise<R> {
  try {
    const { data } = await client.put<R>(url, body, config);
    return data;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
}

export async function del<R = any>(url: string, config?: AxiosRequestConfig): Promise<R> {
  try {
    const { data } = await client.delete<R>(url, config);
    return data;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
}

export function setAuthToken(token?: string) {
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common.Authorization;
  }
}

export default client;
