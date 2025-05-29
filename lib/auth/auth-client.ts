import { createAuthClient } from "better-auth/react";
import {
  usernameClient,
} from "better-auth/client/plugins";
import { toast } from "sonner";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL!,
  plugins: [
    usernameClient(),
    inferAdditionalFields<typeof auth>(),
  ],
  fetchOptions: {
    onError(e) {
      if (e.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
});

export const { signUp, signIn, signOut, useSession } = authClient;
