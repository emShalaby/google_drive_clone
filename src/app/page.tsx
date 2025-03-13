import { db } from "~/server/db";
import DriveContents from "./drive-contents";
import { filesTable, foldersTable } from "~/server/db/schema";

const DrivePage = async () => {
  const files = await db.select().from(filesTable);
  const folders = await db.select().from(foldersTable);
  console.log(files, folders, "FILES AND FOLDERS");
  return <DriveContents files={files} folders={folders} />;
};

export default DrivePage;
