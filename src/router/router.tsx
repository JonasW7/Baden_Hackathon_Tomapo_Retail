import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "@pages/HomePage";
import WeatherPage from "@pages/WeatherPage";
import RootTemplate from "@templates/RootTemplate";
import PrivateTemplate from "@/components/templates/PrivateTemplate";
import { userContext } from "@/context/userContext";
import { getUser } from "@/services/userService";
import LoginPage from "@/components/pages/LoginPage";

// TODO fix type err & move function to separate file
async function authMiddleware({ context }) {
  const user = await getUser();

  if (!user) {
    throw redirect("/login");
  }
  context.set(userContext, user);
}

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
