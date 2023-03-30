import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserSession } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUserSession(request);

  if (user) {
    return redirect("/dashboard");
  }

  return redirect("/login");
};
