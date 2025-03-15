import 'server-only';

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { filesTable, foldersTable } from "~/server/db/schema";
export const QUERIES={
  getAllParentsForFolder:async function (folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(foldersTable)
        .where(eq(foldersTable.id, currentId));
      if (!folder[0]) throw new Error("Folder not found");
      parents.unshift(folder[0]);
      currentId = folder[0].parent;
    }
    return parents;
  },
  getFolders:function(folderId:number){
   return db
   .select()
   .from(foldersTable)
   .where(eq(filesTable.parent, folderId));
 },
 getFiles:function(folderId:number){
   return db
   .select()
   .from(filesTable)
   .where(eq(foldersTable.parent, folderId));
 }
}
