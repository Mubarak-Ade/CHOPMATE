import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

type QueryParamValue = string | number | boolean | undefined;

interface ApiRequestOptions {
  method?: AxiosRequestConfig["method"];
  body?: unknown;
  params?: Record<string, QueryParamValue> | undefined;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const apiRequest = async <T>(path: string, options: ApiRequestOptions = {}): Promise<T> => {
  const { method = "GET", body, params } = options;

  try {
    const response = await apiClient.request<ApiResponse<T>>({
      url: normalizePath(path),
      method,
      data: body,
      params,
    });
    const payload = response.data;

    if (!payload.success) {
      throw new Error(payload.message || "Something went wrong. Try again.");
    }

    return payload.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const payload = error.response?.data as Partial<ApiResponse<unknown>> | undefined;
      throw new Error(payload?.message || error.message || "Something went wrong. Try again.");
    }

    throw error;
  }
};

export const apiGet = <T>(path: string, params?: Record<string, QueryParamValue>) =>
  apiRequest<T>(path, { method: "GET", params });

export const apiPost = <T>(path: string, body?: unknown) =>
  apiRequest<T>(path, { method: "POST", body });

export const apiPatch = <T>(path: string, body?: unknown) =>
  apiRequest<T>(path, { method: "PATCH", body });

export const apiDelete = <T>(path: string) => apiRequest<T>(path, { method: "DELETE" });
