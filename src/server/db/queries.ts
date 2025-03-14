import 'server-only';

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { DB_FileType, filesTable, foldersTable } from "~/server/db/schema";
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
   .where(eq(foldersTable.parent, folderId));
 },
 getFiles:function(folderId:number){
   return db
   .select()
   .from(filesTable)
   .where(eq(filesTable.parent, folderId));
 }
}

export const MUTATIONS={
  createFile:async function(input:{file:{
    name:string;
    size:number;
    url:string;
    fileType:string;
  },userId:string}){
    return await db.insert(filesTable).values({...input.file,parent:1})
  }
}