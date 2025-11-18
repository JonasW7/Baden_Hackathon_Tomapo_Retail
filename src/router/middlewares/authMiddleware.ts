import { userContext } from "@/context/userContext";
import { getUser } from "@/services/userService";
import { redirect } from "react-router-dom";
import type { MiddlewareFunction } from "react-router-dom";

// export default async function authMiddleware(
//   args: Parameters<MiddlewareFunction>[0]
// ) {
//   const { context } = args;
//   const user = await getUser();

//   if (!user) throw redirect("/login");

//   context.set(userContext, user);
// }

export const authMiddleware: MiddlewareFunction = async ({ context }) => {
  const user = await getUser();

  if (!user) throw redirect("/login");

  context.set(userContext, user);
};
export default authMiddleware;
