import { useQuery } from "@tanstack/react-query";
import { getAlert } from "@/services/alertService";

export function useAlert(alertId) {
  return useQuery({
    queryKey: ["alert", alertId],
    queryFn: () => getAlert(alertId),
    enabled: !!alertId,
  });
}