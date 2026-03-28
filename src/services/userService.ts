import type { User, LoginResponse } from "@/types/User";

const BASE_URL = "http://localhost:3000/api/v1/auth";

const TOKEN_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const USER_KEY = "user";

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Login failed");
  }

  const { accessToken, refreshToken, user } = json.data as LoginResponse;

  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return { accessToken, refreshToken, user };
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function isLoggedIn(): boolean {
  return !!getAccessToken();
}
