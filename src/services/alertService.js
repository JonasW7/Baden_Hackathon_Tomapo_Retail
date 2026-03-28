import { getAccessToken } from "@/services/userService";

const BASE_URL = "http://localhost:3000/api/v1";

export async function getAlert(alertId) {
  const response = await fetch(`${BASE_URL}/alerts/id/${alertId}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch alert");
  return response.json();
}