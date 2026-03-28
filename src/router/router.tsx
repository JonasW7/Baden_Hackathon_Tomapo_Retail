import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/components/pages/Dashboard";
import RootTemplate from "@templates/RootTemplate";
import LoginPage from "@/components/pages/LoginPage";
import ProductionIssues from "@/components/pages/ProductionIssues";
import RecallCenter from "@/components/pages/RecallCenter";
import UserIssues from "@/components/pages/UserIssues";
import authMiddleware from "./middlewares/authMiddleware";

const router = createBrowserRouter([
  { path: "/login", Component: LoginPage },
  {
    path: "/",
    Component: RootTemplate,
    middleware: [authMiddleware],
    children: [
      { index: true, Component: HomePage },
      { path: "issues-production", Component: ProductionIssues },
      { path: "issues-user", Component: UserIssues },
      { path: "recall-center", Component: RecallCenter },
    ],
  },
]);

export default router;
