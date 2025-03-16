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

  if (!file) {
    return { error: "File not found" };
  }
  const utapiResult = await utApi.deleteFiles([
    file.url.replace("https://utfs.io/f/", ""),
  ]);
  console.log(utapiResult);
  const dbDeleteResult = await db
    .delete(filesTable)
    .where(
      and(eq(filesTable.id, fileId), eq(filesTable.ownerId, session.userId)),
    );
  console.log(dbDeleteResult);
  
  const c =await cookies()

  c.set('force-refresh',JSON.stringify(Math.random()))
  
  return {success:true}
}
