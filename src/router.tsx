import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/HomePage";
import WeatherPage from "@pages/WeatherPage";
import RootTemplate from "@templates/RootTemplate";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootTemplate,
    children: [
      { index: true, Component: HomePage },
      { path: "weather", Component: WeatherPage },
    ],
  },
]);
export default router;