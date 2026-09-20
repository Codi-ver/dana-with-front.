export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type Json = Record<string, unknown>;

/**
 * All requests carry the session cookie (`credentials: "include"`).
 * For multipart uploads pass a FormData body directly.
 */
export async function api<T = Json>(
  path: string,
  {
    method = "GET",
    body,
    signal,
  }: { method?: string; body?: object | FormData; signal?: AbortSignal } = {},
): Promise<T> {
  const isForm = body instanceof FormData;
  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials: "include",
    signal,
    headers: isForm || body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as T & { err?: string };

  if (!res.ok) {
    throw new ApiError(data.err || "خطای غیرمنتظره در ارتباط با سرور", res.status);
  }
  return data;
}

/** Backend serves images as `/uploads/<file>` — build the absolute URL. */
export const imageUrl = (path: string | null | undefined) =>
  path ? `${API_URL}${path}` : null;
