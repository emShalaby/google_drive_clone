import 'server-only';

import { and, eq, isNull } from "drizzle-orm";
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
   .where(eq(foldersTable.parent, folderId)).orderBy(foldersTable.id);
 },
 getFiles:function(folderId:number){
   return db
   .select()
   .from(filesTable)
   .where(eq(filesTable.parent, folderId)).orderBy(filesTable.id);
 },
 getFolderById: async function (folderId:number,userId:string){
  const folder=await db.select().from(foldersTable).where(and(eq(foldersTable.id,folderId),eq(foldersTable.ownerId,userId)))
  return folder[0]
},
getFileById: async function (fileId:number,userId:string){
  const file=await db.select().from(filesTable).where(and(eq(filesTable.id,fileId),eq(filesTable.ownerId,userId)))
  return file[0]
},
getRootFolder:async function (userId:string){
  const file= await db.select().from(foldersTable).where(and(eq(foldersTable.ownerId,userId),isNull(foldersTable.parent)))
  return file[0]
}
}

export const MUTATIONS={
  createFile:async function(input:{file:{
    name:string;
    size:number;
    url:string;
    fileType:string;
    parent:number;
    createdAt:Date;
  },userId:string}){
    return await db.insert(filesTable).values({...input.file,ownerId:input.userId,createdAt:new Date()})
  },

}