const BASE_URL = "http://localhost:3000/api/v1/auth";

const TOKEN_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const USER_KEY = "user";

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Login failed");
  }

  const { accessToken, refreshToken, user } = json.data;

  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return { accessToken, refreshToken, user };
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn() {
  return !!getAccessToken();
}
