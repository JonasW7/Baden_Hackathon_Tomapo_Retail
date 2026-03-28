import { redirect } from "react-router-dom";
import type { MiddlewareFunction } from "react-router-dom";
import { isLoggedIn } from "@/services/userService";

export const authMiddleware: MiddlewareFunction = () => {
  if (!isLoggedIn()) throw redirect("/login");
};

export default authMiddleware;
