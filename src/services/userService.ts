// replace with real auth. This is only a placeholder that checks for a token named "token" in browser
export function getUser() {
  return localStorage.getItem("token");
}
