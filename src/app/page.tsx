"use client"

import { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { FileList } from "~/components/file-list"
import { UploadButton } from "~/components/upload-button"
import { mockFileSystem } from "~/lib/mock-data"

export default function DrivePage() {
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [currentView, setCurrentView] = useState<"grid" | "list">("grid")

  // Navigate to a specific folder
  const navigateToFolder = (folderPath: string[]) => {
    setCurrentPath(folderPath)
  }

  // Navigate up one level
  const navigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1))
    }
  }

  // Get current folder content based on path
  const getCurrentFolder = () => {
    let current = mockFileSystem

    for (const folder of currentPath) {
      const foundFolder = current.items.find((item) => item.type === "folder" && item.name === folder)

      if (foundFolder && foundFolder.type === "folder") {
        current = foundFolder
      } else {
        return mockFileSystem // Return root if path is invalid
      }
    }

    return current
  }

  const currentFolder = getCurrentFolder()

  // Generate breadcrumb items
  const breadcrumbItems = [
    { name: "My Drive", path: [] },
    ...currentPath.map((folder, index) => ({
      name: folder,
      path: currentPath.slice(0, index + 1),
    })),
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-xl font-semibold">Google Drive Clone</h1>
          <div className="ml-auto flex items-center gap-2">
            <Input placeholder="Search in Drive" className="w-64 md:w-80" />
            <UploadButton currentPath={currentPath} />
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <BreadcrumbItem key={index}>
                  {index < breadcrumbItems.length - 1 ? (
                    <>
                      <BreadcrumbLink onClick={() => navigateToFolder(item.path)} className="cursor-pointer">
                        {item.name}
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  ) : (
                    <BreadcrumbLink>{item.name}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-2">
            {currentPath.length > 0 && (
              <Button variant="outline" size="sm" onClick={navigateUp}>
                Back
              </Button>
            )}
            <Tabs defaultValue="grid" value={currentView} onValueChange={(v) => setCurrentView(v as "grid" | "list")}>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <FileList
          items={currentFolder.items}
          currentPath={currentPath}
          onNavigate={navigateToFolder}
          view={currentView}
        />
      </main>
    </div>
  )
}

