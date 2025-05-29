import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export const getSession = async () => {
  const [session] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
  ]).catch((e) => {
    throw e;
  });

  return session;
};

