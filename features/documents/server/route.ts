import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import db from "@/lib/db";
import { Session } from "@/types/auth";
import APIResponse from "@/helper/apiResponse";
import z from "zod";

const app = new Hono<{
  Variables: {
    user: Session["user"] | null;
    session: Session["session"] | null;
  };
}>()
  .get("/all-documents", async (c) => {
    const userId = c.get("user")?.id;
    if (!userId) {
      return c.json(new APIResponse(401, "Unauthorized", null), 401);
    }

    try {
      const documents = await db.document.findMany({
        where: {
          userId,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      return c.json(
        new APIResponse(200, "Documents fetched successfully", documents),
        200,
      );
    } catch (error) {
      console.error("Error fetching documents:", error);
      return c.json(
        new APIResponse(500, "Failed to fetch documents", null),
        500,
      );
    }
  })
  .post(
    "/create-document",
    zValidator(
      "json",
      z.object({
        title: z.string().min(1).default("Untitled"),
        content: z.string().optional(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
      }),
    ),
    async (c) => {
      const userId = c.get("user")?.id;
      if (!userId) {
        return c.json(new APIResponse(401, "Unauthorized", null), 401);
      }

      const { title, content = "", description, tags } = await c.req.json();

      try {
        const document = await db.document.create({
          data: {
            title,
            content,
            description,
            tags: tags || [],
            userId,
          },
        });

        return c.json(
          new APIResponse(201, "Document created successfully", document),
          201,
        );
      } catch (error) {
        console.error("Error creating document:", error);
        return c.json(
          new APIResponse(500, "Failed to create document", null),
          500,
        );
      }
    },
  )

  .get(
    "/document-by-id",
    zValidator("query", z.object({ id: z.string() })),
    async (c) => {
      const userId = c.get("user")?.id;
      if (!userId) {
        return c.json(new APIResponse(401, "Unauthorized", null), 401);
      }

      const id = c.req.valid("query").id;

      try {
        const document = await db.document.findUnique({
          where: {
            id,
            userId,
          },
        });

        if (!document) {
          return c.json(new APIResponse(404, "Document not found", null), 404);
        }

        return c.json(
          new APIResponse(200, "Document fetched successfully", document),
          200,
        );
      } catch (error) {
        console.error("Error fetching document:", error);
        return c.json(
          new APIResponse(500, "Failed to fetch document", null),
          500,
        );
      }
    },
  )
  .post(
    "/update-document-by-id",
    zValidator(
      "json",
      z.object({
        id: z.string().min(1),
        title: z.string().min(1).optional(),
        content: z.string().optional(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
        isShared: z.boolean().optional(),
      }),
    ),
    async (c) => {
      const userId = c.get("user")?.id;
      if (!userId) {
        return c.json(new APIResponse(401, "Unauthorized", null), 401);
      }

      const { id, title, content, description, tags, isShared } =
        await c.req.valid("json");

      try {
        const existingDoc = await db.document.findUnique({
          where: {
            id,
            userId,
          },
        });

        if (!existingDoc) {
          return c.json(new APIResponse(404, "Document not found", null), 404);
        }

        // Log the update operation for debugging
        console.log("Document update request:", {
          id,
          contentProvided: content !== undefined,
          contentLength: content?.length,
          titleProvided: title !== undefined,
        });

        const updateData: any = {};

        // Always set the fields that are provided
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        if (description !== undefined) updateData.description = description;
        if (tags !== undefined) updateData.tags = tags;
        if (isShared !== undefined) updateData.isShared = isShared;

        // Handle share link generation
        if (isShared === true && !existingDoc.shareLink) {
          updateData.shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/shared/${id}`;
        }

        const updatedDoc = await db.document.update({
          where: {
            id,
          },
          data: updateData,
        });

        return c.json(
          new APIResponse(200, "Document saved successfully", updatedDoc),
          200,
        );
      } catch (error) {
        console.error("Error updating document:", error);
        return c.json(
          new APIResponse(500, "Failed to update document", null),
          500,
        );
      }
    },
  )
  .post(
    "/delete-document-by-id",
    zValidator("json", z.object({ id: z.string() })),
    async (c) => {
      const userId = c.get("user")?.id;
      if (!userId) {
        return c.json(new APIResponse(401, "Unauthorized", null), 401);
      }

      const id = c.req.valid("json").id;

      try {
        const existingDoc = await db.document.findUnique({
          where: {
            id,
            userId,
          },
        });

        if (!existingDoc) {
          return c.json(new APIResponse(404, "Document not found", null), 404);
        }

        await db.document.delete({
          where: {
            id,
          },
        });

        return c.json(
          new APIResponse(200, "Document deleted successfully", null),
          200,
        );
      } catch (error) {
        console.error("Error deleting document:", error);
        return c.json(
          new APIResponse(500, "Failed to delete document", null),
          500,
        );
      }
    },
  );

export default app;
