// src/hooks/useWeather.ts
import { useQuery } from "@tanstack/react-query";
import { getWeather } from "@/services/weatherService";

export function useWeather(city: string) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city),
  });
}
