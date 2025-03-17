import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DriveContents from "~/app/f/[folderid]/drive-contents";
import { QUERIES } from "~/server/db/queries";

const DrivePage = async ({
  params,
}: {
  params: Promise<{ folderid: string }>;
}) => {
  const session = await auth();
  if (!session.userId) redirect("/");
  const paramsResolve = await params;
  const parsedFolderId = parseInt(paramsResolve.folderid);
  if (isNaN(parsedFolderId)) {
    return <div>invalid folder ID </div>;
  }

  const [folders, files, parents, rootFolder] = await Promise.all([
    QUERIES.getFolders(parsedFolderId),
    QUERIES.getFiles(parsedFolderId),
    QUERIES.getAllParentsForFolder(parsedFolderId),
    QUERIES.getRootFolder(session.userId),
  ]);
  if (session.userId !== rootFolder?.ownerId) redirect("/drive");
  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={parsedFolderId}
    />
  );
};

export default DrivePage;
