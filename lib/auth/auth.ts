import { betterAuth } from "better-auth";
import { bearer, username } from "better-auth/plugins";
import { reactResetPasswordEmail } from "@/components/email/rest-password";
import { resend } from "@/lib/resend";
import { prismaAdapter } from "better-auth/adapters/prisma";
import db from "@/lib/db";
import { additionalUserFields } from "@/lib/auth/additional-fields";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL!,
  database: prismaAdapter(db, { provider: "mongodb" }),
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  user: { additionalFields: additionalUserFields },
  emailAndPassword: {
    enabled: true,
    resetPasswordTokenExpiresIn: 600,
    async sendResetPassword({ user, url }) {
      await resend.emails.send({
        from: process.env.SEND_EMAIL_FROM!,
        to: user.email,
        subject: "Reset your password",
        react: reactResetPasswordEmail({
          username: user.email,
          resetLink: url,
        }),
      });
    },
  },
  plugins: [bearer(), username()],
  advanced: { cookiePrefix: process.env.APP_NAME! },
});
