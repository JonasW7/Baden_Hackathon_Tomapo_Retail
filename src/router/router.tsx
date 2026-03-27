import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/components/pages/Dashboard";
import WeatherPage from "@pages/WeatherPage";
import RootTemplate from "@templates/RootTemplate";
import PrivateTemplate from "@/components/templates/PrivateTemplate";
import LoginPage from "@/components/pages/LoginPage";
import ProductionIssues from "@/components/pages/ProductionIssues";
import RecallCenter from "@/components/pages/RecallCenter";
import UserIssues from "@/components/pages/UserIssues";
import authMiddleware from "./middlewares/authMiddleware";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootTemplate,
    children: [
      { path: "login", Component: LoginPage },
      { index: true, Component: HomePage },
      { path: "issues-production", Component: ProductionIssues },
      { path: "issues-user", Component: UserIssues },
      { path: "recall-center", Component: RecallCenter },
      // Private Route
      // {
      //   // Use middleware to run auth before rendering component
      //   middleware: [authMiddleware],
      //   Component: PrivateTemplate,
      //   children: [
      //     { path: "weather", Component: WeatherPage },
      //   ],
      // },
    ],
  },
]);

export default router;
