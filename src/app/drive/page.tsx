import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MUTATIONS, QUERIES } from "~/server/db/queries";

export default async function Drive() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");
  const rootFolder = await QUERIES.getRootFolder(session.userId);
  if (!rootFolder) {
    const rootFolderId = await MUTATIONS.createRootFolder(session.userId);
    console.log(rootFolderId, "root folder");
    redirect(`/f/${rootFolderId}`);
  }
  redirect(`/f/${String(rootFolder?.id)}`);
}
