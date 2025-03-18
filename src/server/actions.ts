"use server";

import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { filesTable, foldersTable } from "./db/schema";
import { auth } from "@clerk/nextjs/server";
import { QUERIES } from "./db/queries";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
  } catch  {
    console.error("Delete failed");
    return { error: "Failed to delete file" };
  }
}

const CreateFolderSchema = z.object({
  parentId: z.string().transform((val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error("Invalid parent ID");
    return num;
  }),
  name: z.string().min(1, "Folder name is required").trim(),
});

export async function CreateFolder(formData: FormData) {
  const session = await auth();
  if (!session.userId) {
    return { error: 'Unauthorize' };
  }
  const data: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      data[key] = value;
    } else {
      return {error:"unexpected file input"}
    }
  }
  const parsed = CreateFolderSchema.parse(data);
  const { parentId, name } = parsed;

  if (!name || name.trim() === "") {
    return { error:  "Folder name is required"  };
  }
  if (isNaN(parentId)) {
    return { error:"Invalid parent ID"  };
  }

  try {
    const parentFolder = await QUERIES.getFolderById(parentId, session.userId);
    if (!parentFolder) {
      return { error:"Folder not found"};
    }

    await db.insert(foldersTable).values({ name: name.trim(), parent: parentId, ownerId: session.userId });
    revalidatePath(`/f/${parentId}`)
    return { success: true };
  } catch  {
    console.error("Creation failed:");
    return { error:"Failed to create folder due to a database issue"  };
  }
}

export async function deleteFolder(folderId: number) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  try {
    const { childrenFolders, childrenFiles } = await QUERIES.getAllFolderChildren(
      folderId,
      session.userId,
    );

    await Promise.all(
      childrenFiles.map(async (file) => {
        await deleteFile(file.id); 
      }),
    );

    for (const folder of childrenFolders) {
      await deleteFolder(folder.id); 
      await db
        .delete(foldersTable)
        .where(
          and(eq(foldersTable.id, folder.id), eq(foldersTable.ownerId, session.userId)),
        );
    }

    await db
      .delete(foldersTable)
      .where(
        and(eq(foldersTable.id, folderId), eq(foldersTable.ownerId, session.userId)),
      );
    return { success: true };
  } catch {
    console.error("Failed to delete folder:");
    return { error: "Failed to delete folder due to an internal error" };
  }
}
export async function rename(id:number,type:'file' | 'folder',newName:string){
  const session =await auth()
  if(!session.userId) return {error:'Unauthorized'}
  try{
    if(type==='file')  await db.update(filesTable).set({name:newName}).where(and(eq(filesTable.id,id),eq(filesTable.ownerId,session.userId)))
      else if(type==='folder') await db.update(foldersTable).set({name:newName}).where(and(eq(foldersTable.id,id),eq(foldersTable.ownerId,session.userId)))
    return {success:true}
  }catch{
    return {error:'Rename failed'}
  }
}