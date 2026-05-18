import type { ApiResponse } from "../types/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api";

type QueryParamValue = string | number | undefined;

const buildUrl = (path: string, params?: Record<string, QueryParamValue>) => {
  const url = new URL(path, API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
};

export const apiRequest = async <T>(
  path: string,
  params?: Record<string, QueryParamValue> | undefined,
): Promise<T> => {
  const response = await fetch(buildUrl(path, params), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Something went wrong. Try again.");
  }

  return payload.data;
};
