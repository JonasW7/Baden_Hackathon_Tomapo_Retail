import type { User } from "@/types/User";

// replace with real auth. This is only a placeholder that checks for a token named "token" in browser
export function getUser(): User | null {
  const token = localStorage.getItem("token");
  
  if (!token) return null;

  return { token };
}
