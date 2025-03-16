import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QUERIES } from "~/server/db/queries";

export default async function Drive() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");
  const rootFolder = await QUERIES.getRootFolder(session.userId);
  redirect(`/f/${String(rootFolder?.id)}`);
}
