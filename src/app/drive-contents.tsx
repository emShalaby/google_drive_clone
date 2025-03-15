"use client";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { FileList } from "~/components/file-list";
import Breadcrumbs from "~/components/breadcrumbs";
import Header from "~/components/header";
import type { filesTable, foldersTable } from "~/server/db/schema";
import { useState } from "react";
import Link from "next/link";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";

export default function DriveContents({
  folders,
  files,
  parents,
  currentFolderId,
}: {
  folders: (typeof foldersTable.$inferSelect)[];
  files: (typeof filesTable.$inferSelect)[];
  parents: (typeof foldersTable.$inferSelect)[];
  currentFolderId: number;
}) {
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");
  const navigate = useRouter();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumbs parents={parents} />
          <div className="flex items-center gap-2">
            {parents.length > 1 && <Link href={`..`}>Back</Link>}
            <Tabs
              defaultValue="grid"
              value={currentView}
              onValueChange={(v) => setCurrentView(v as "grid" | "list")}
            >
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <FileList
          folderItems={folders.filter(
            (i) => i.parent === parents[parents.length - 1]?.id,
          )}
          fileItems={files.filter(
            (i) => i.parent === parents[parents.length - 1]?.id,
          )}
          view={currentView}
        />
        <UploadButton
          endpoint={"driveUploader"}
          onClientUploadComplete={() => navigate.refresh()}
          input={{
            folderId: currentFolderId,
          }}
        />
      </main>
    </div>
  );
}
