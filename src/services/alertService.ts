import type { Alert } from "@/types/Alert";

const BASE_URL = "http://localhost:3000/api/v1";

export async function getAlert(alertId: string): Promise<Alert> {
  const response = await fetch(`${BASE_URL}/alerts/id/${alertId}`);
  if (!response.ok) throw new Error("Failed to fetch alert");
  return response.json();
}
