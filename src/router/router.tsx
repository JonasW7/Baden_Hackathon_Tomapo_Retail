import { createBrowserRouter } from "react-router-dom";
import HomePage from "@pages/HomePage";
import WeatherPage from "@pages/WeatherPage";
import RootTemplate from "@templates/RootTemplate";
import PrivateTemplate from "@/components/templates/PrivateTemplate";
import LoginPage from "@/components/pages/LoginPage";
import authMiddleware from "./middlewares/authMiddleware";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootTemplate,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },

      // Private Route
      {
        // Use middleware to run auth before rendering component
        middleware: [authMiddleware],
        Component: PrivateTemplate,
        children: [{ path: "weather", Component: WeatherPage }],
      },
    ],
  },
]);

export default router;
