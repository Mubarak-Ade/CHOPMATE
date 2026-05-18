import type { ApiResponse } from "@/types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

type QueryParamValue = string | number | boolean | undefined;

type ApiMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface ApiRequestOptions {
  method?: ApiMethod;
  body?: unknown;
  params?: Record<string, QueryParamValue> | undefined;
}

const buildUrl = (path: string, params?: Record<string, QueryParamValue>) => {
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  const url = new URL(normalizedPath, API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
};

export const apiRequest = async <T>(path: string, options: ApiRequestOptions = {}): Promise<T> => {
  const { method = "GET", body, params } = options;

  const response = await fetch(buildUrl(path, params), {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Something went wrong. Try again.");
  }

  return payload.data;
};

export const apiGet = <T>(path: string, params?: Record<string, QueryParamValue>) =>
  apiRequest<T>(path, { method: "GET", params });

export const apiPost = <T>(path: string, body?: unknown) =>
  apiRequest<T>(path, { method: "POST", body });

export const apiPatch = <T>(path: string, body?: unknown) =>
  apiRequest<T>(path, { method: "PATCH", body });

export const apiDelete = <T>(path: string) => apiRequest<T>(path, { method: "DELETE" });
