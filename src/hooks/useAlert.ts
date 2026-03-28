import { useQuery } from "@tanstack/react-query";
import { getAlert } from "@/services/alertService";
import { type Alert } from "@/types/Alert";

export type { Alert };

export function useAlert(alertId: string) {
  return useQuery({
    queryKey: ["alert", alertId],
    queryFn: () => getAlert(alertId),
    enabled: !!alertId,
  });
}
