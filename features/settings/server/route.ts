import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { accountFormSchema, profileFormSchema } from "@/schemas/settings";
import db from "@/lib/db";
import { Session } from "@/types/auth";
import APIResponse from "@/helper/apiResponse";

const app = new Hono<{
  Variables: {
    user: Session["user"] | null;
    session: Session["session"] | null;
  };
}>()
  .post("/profile", zValidator("json", profileFormSchema), async (c) => {
    try {
      const { name, pronouns, bio, urls } = c.req.valid("json");
      const userId = await c.get("user")?.id;

      if (!userId) {
        return c.json(new APIResponse(401, "Unauthorized access", null), 401);
      }

      await db.user.update({
        where: { id: userId },
        data: { name, pronouns, bio, urls: urls?.map((url) => url.value) },
      });

      return c.json(
        new APIResponse(200, "Profile updated successfully.", null),
        200,
      );
    } catch (error) {
      return c.json(
        new APIResponse(500, "Failed to update profile", null),
        500,
      );
    }
  })
  .post("/account", zValidator("json", accountFormSchema), async (c) => {
    try {
      const { username, email, timezone, language } = await c.req.valid("json");
      const userId = await c.get("user")?.id;

      if (!userId) {
        return c.json(new APIResponse(401, "Unauthorized access", null), 401);
      }

      await db.user.update({
        where: { id: userId },
        data: { username, email, timezone, language },
      });

      return c.json(
        new APIResponse(200, "Account updated successfully.", null),
        200,
      );
    } catch (error) {
      return c.json(
        new APIResponse(500, "Failed to update account", null),
        500,
      );
    }
  })
  .post(
    "/security",
    // zValidator("json", securityFormSchema),
    async (c) => {
      const userId = await c.get("user")?.id;

      if (!userId) {
        return c.json(new APIResponse(401, "Unauthorized access", null), 401);
      }
      return c.json(
        new APIResponse(200, "Security updated successfully.", null),
        200,
      );
    },
  );

export default app;
