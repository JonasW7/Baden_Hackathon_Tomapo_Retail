import { useState } from "react";
import { useWeather } from "@/hooks/useWeather";

export default function WeatherPage() {
  const [city, setCity] = useState<string>("Zug");
  const { data: weather, error, isLoading } = useWeather(city);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("city") as HTMLInputElement;
    setCity(input.value);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Weather</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="city"
          type="text"
          placeholder="Enter city"
          defaultValue={city}
        />
        <button type="submit">Search</button>
      </form>

      {weather && (
        <div className="mt-4">
          <h1>Weather in {weather.name}</h1>
          <p>{weather.weather[0].description}</p>
          <p>{weather.main.temp}°C</p>
        </div>
      )}
      {/* User Feedback */}
      {error && <p>Error: {(error as Error).message}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
