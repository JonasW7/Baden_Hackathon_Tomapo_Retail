import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";
import WeatherPage from "@/components/pages/WeatherPage";
import RootTemplate from "@/components/templates/RootTemplate";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootTemplate,
    children: [
      { index: true, Component: HomePage },
      { path: "weather", Component: WeatherPage },
    ],
  },
]);
