import { eq } from "drizzle-orm";
import DriveContents from "~/app/drive-contents";
import { db } from "~/server/db";
import { filesTable, foldersTable } from "~/server/db/schema";

async function getAllParents(folderId: number) {
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
}
const DrivePage = async ({
  params,
}: {
  params: Promise<{ folderid: string }>;
}) => {
  const paramsResolve = await params;
  const parsedFolderId = parseInt(paramsResolve.folderid);
  if (isNaN(parsedFolderId)) {
    return <div>invalid folder ID </div>;
  }
  const filesPromise = db
    .select()
    .from(filesTable)
    .where(eq(filesTable.parent, parsedFolderId));
  const foldersPromise = db
    .select()
    .from(foldersTable)
    .where(eq(foldersTable.parent, parsedFolderId));

  const parentsPromise = getAllParents(parsedFolderId);
  const [folders, files, parents] = await Promise.all([
    foldersPromise,
    filesPromise,
    parentsPromise,
  ]);
  return <DriveContents files={files} folders={folders} parents={parents} />;
};

export default DrivePage;
