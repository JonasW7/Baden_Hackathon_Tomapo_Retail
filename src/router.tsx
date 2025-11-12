import { createBrowserRouter } from "react-router-dom";
import App from "@/components/pages/App";
import WeatherStats from "@/components/pages/WeatherStats";
import RootLayout from "@/components/templates/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: App },
      { path: "weather", Component: WeatherStats },
    ],
  },
]);
