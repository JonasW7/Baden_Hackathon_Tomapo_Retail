import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/HomePage";
import WeatherPage from "@pages/WeatherPage";
import RootTemplate from "@templates/RootTemplate";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootTemplate,
    children: [
      { index: true, Component: HomePage },
      { path: "weather", Component: WeatherPage },
      // Private routes
      {
        element: <PrivateRoute />,
        children: [
          { path: "weatherPrivate", Component: WeatherPage},
        ],
      },
    ],
  },
]);
export default router;