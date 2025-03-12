"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { FileList } from "~/components/file-list";
import { folders, files } from "~/lib/mock-data";
import Breadcrumbs from "~/components/breadcrumbs";
import Header from "~/components/header";
export default function DrivePage() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid");

  const navigateToFolder = (folderPath: string[]) => {
    setCurrentPath(folderPath);
  };

  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  const getCurrentFolder = () => {
    let current = folders.find((f) => f.id === "root");
    if (currentPath.length === 0) return current;
    current = folders.find(
      (f) =>
        f.name === currentPath[currentPath.length - 1] &&
        f.parent === current?.id,
    );
    return current;
  };

  const currentFolder = getCurrentFolder();
  console.log(JSON.stringify(currentFolder), "current folder");
  const breadcrumbItems: { path: string[]; name: string }[] = (() => {
    const items: { path: string[]; name: string }[] = [
      { name: "My Drive", path: [] },
    ];
    if (currentPath.length === 0) {
      return items;
    } else {
      for (let i = 0; i < currentPath.length; i++) {
        const name = currentPath[i];
        if (name) {
          items.push({
            name,
            path: currentPath.slice(0, i + 1),
          });
        }
      }
      return items;
    }
  })();
  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPath={currentPath} />
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumbs
            breadcrumbItems={breadcrumbItems}
            onClick={navigateToFolder}
          />
          <div className="flex items-center gap-2">
            {currentPath.length > 0 && (
              <Button variant="outline" size="sm" onClick={navigateUp}>
                Back
              </Button>
            )}
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
          itemIds={[...folders, ...files]
            .filter((i) => i.parent === currentFolder?.id)
            .map((i) => i.id)}
          currentPath={currentPath}
          onNavigate={navigateToFolder}
          view={currentView}
        />
      </main>
    </div>
  );
}
