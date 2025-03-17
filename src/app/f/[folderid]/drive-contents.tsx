"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Breadcrumbs from "~/components/breadcrumbs";

import Header from "~/components/header";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { UploadButton } from "~/components/uploadthing";
import type { filesTable, foldersTable } from "~/server/db/schema";
import { FileList } from "./file-list";
import { FolderPlus } from "lucide-react";
import { AddFolderButton } from "~/components/ui/add-folder-button";
import { AddFolderDialog } from "~/components/ui/add-folder-dialog";

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
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const navigate = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-gray-800">
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-[2000px]">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Breadcrumbs parents={parents} />
            <div className="flex items-center gap-2">
              {parents.length > 1 && (
                <Link href={`..`} className="text-gray-300 hover:text-white">
                  Back
                </Link>
              )}

              <AddFolderButton onClick={() => setIsCreateFolderOpen(true)}>
                <FolderPlus className="mr-2 h-4 w-4" />
                New Folder
              </AddFolderButton>

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

          <div className="mt-6 flex items-center justify-center gap-4">
            <UploadButton
              endpoint={"driveUploader"}
              onClientUploadComplete={() => navigate.refresh()}
              input={{
                folderId: currentFolderId,
              }}
            />
          </div>
        </div>

        <AddFolderDialog
          isOpen={isCreateFolderOpen}
          onClose={() => {
            setIsCreateFolderOpen(false);
          }}
          parentId={parents[parents.length - 1]!.id}
        />
      </main>
    </div>
  );
}
