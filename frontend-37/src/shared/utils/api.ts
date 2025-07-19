import { API_URL } from "@/config/env";

async function refreshTokens() {
  const res = await fetch(`${API_URL}/account/token/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: localStorage.getItem("refresh_token"),
    }),
  });

  if (!res.ok) return false;

  const json = await res.json();

  localStorage.setItem("refresh_token", json.refresh);
  localStorage.setItem("access_token", json.access);

  return true;
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiOptions {
  path: string;
  method?: Method;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  useSession?: boolean;
  useJwt?: boolean;
  useJson?: boolean;
}

export async function api<T>({
  path,
  method = "GET",
  body = undefined,
  useSession = true,
  useJwt = true,
  useJson = true,
}: ApiOptions): Promise<T> {
  const session_id = localStorage.getItem("session_id");
  const access_token = localStorage.getItem("access_token");

  const headers: Record<string, string> = {};

  if (useJson) headers["Content-Type"] = "application/json";
  if (useSession && session_id) headers.Session = session_id;
  if (useJwt && access_token) headers.Authorization = `Bearer ${access_token}`;

  const options: RequestInit = {
    method,
    headers,
  };

  if (body != null && method !== "GET") {
    options.body = useJson ? JSON.stringify(body) : body;
  }

  console.log(`New API request to ${API_URL}/${path}, options:`);
  console.log(options);

  const res = await fetch(`${API_URL}/${path}`, options);

  if (res.status === 401) {
    if (!access_token) {
      throw new Error("Unauthorized.");
    }
    console.log("API request got 401 response, generating new tokens");
    const ok = await refreshTokens();
    if (ok) {
      console.log("Regenerated tokens successfully, trying again");
      return api({ path, method, body, useSession, useJwt });
    } else {
      throw new Error("Authentication failed: could not refresh token.");
    }
  }

  if (!res.ok) {
    const err = await res.text();
    return JSON.parse(err) as T;
  }

  console.log("API request successful.");
  return res.json() as T;
}
