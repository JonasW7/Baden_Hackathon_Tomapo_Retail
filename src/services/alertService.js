import { getAccessToken } from "@/services/userService";

const BASE_URL = "http://localhost:3000/api/v1";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getAccessToken()}`,
});

export async function getAlert(alertId) {
  const response = await fetch(`${BASE_URL}/alerts/id/${alertId}`, {
    headers: authHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch alert");
  return response.json();
}

export async function createAlert(payload) {
  console.log(payload);
  const response = await fetch(`${BASE_URL}/alerts`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to create alert");
  return response.json();
}
