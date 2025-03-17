"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { filesTable } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { QUERIES } from "./db/queries";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) return { error: "unauthorized" };

  const file = await QUERIES.getFileById(fileId, session.userId);
  if (!file) return { error: "File not found" };

  try {
    const utapiResult = await utApi.deleteFiles([
      file.url.replace("https://utfs.io/f/", ""),
    ]);
    if (!utapiResult.success) throw new Error("Failed to delete file from storage");

    await db
      .delete(filesTable)
      .where(
        and(eq(filesTable.id, fileId), eq(filesTable.ownerId, session.userId)),
      );

    const c = await cookies();
    c.set('force-refresh', JSON.stringify(Math.random()));
    return { success: true };
  } catch (error) {
    console.error("Delete failed:", error);
    return { error: "Failed to delete file" };
  }
}
