"use client"
import Link from "next/link"
import {
  FileIcon,
  FolderIcon,
  MoreVertical,
  FileImage,
  FileText,
  FileArchive,
  FileAudio,
  FileVideo,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { formatBytes, formatDate } from "~/lib/utils"
import type { FileItem, FolderItem } from "~/lib/mock-data"

interface FileListProps {
  items: (FileItem | FolderItem)[]
  currentPath: string[]
  onNavigate: (path: string[]) => void
  view: "grid" | "list"
}

export function FileList({ items, currentPath, onNavigate, view }: FileListProps) {
  // Get appropriate icon based on file type
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "image":
        return <FileImage className="h-6 w-6 text-blue-500" />
      case "document":
        return <FileText className="h-6 w-6 text-green-500" />
      case "archive":
        return <FileArchive className="h-6 w-6 text-yellow-500" />
      case "audio":
        return <FileAudio className="h-6 w-6 text-purple-500" />
      case "video":
        return <FileVideo className="h-6 w-6 text-red-500" />
      default:
        return <FileIcon className="h-6 w-6 text-gray-500" />
    }
  }

  // Handle folder click
  const handleFolderClick = (folderName: string) => {
    onNavigate([...currentPath, folderName])
  }

  if (view === "grid") {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((item, index) => (
          <Card key={index} className="overflow-hidden">
            {item.type === "folder" ? (
              <div
                className="flex h-32 cursor-pointer flex-col items-center justify-center bg-muted/50 p-4"
                onClick={() => handleFolderClick(item.name)}
              >
                <FolderIcon className="h-12 w-12 text-yellow-500" />
              </div>
            ) : (
              <div className="flex h-32 flex-col items-center justify-center bg-muted/50 p-4">
                {getFileIcon(item.fileType)}
                {item.fileType === "image" && (
                  <div className="mt-2 h-16 w-16 overflow-hidden rounded">
                    <img
                      src={`/placeholder.svg?height=64&width=64`}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}
            <CardContent className="p-3">
              <div className="truncate font-medium">
                {item.type === "folder" ? (
                  <span className="cursor-pointer hover:underline" onClick={() => handleFolderClick(item.name)}>
                    {item.name}
                  </span>
                ) : (
                  <Link href="#" className="hover:underline">
                    {item.name}
                  </Link>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{item.type === "file" && formatBytes(item.size)}</div>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-2">
              <span className="text-xs text-muted-foreground">{formatDate(item.modifiedAt)}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Name</TableHead>
            <TableHead>Modified</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {item.type === "folder" ? (
                    <>
                      <FolderIcon className="h-5 w-5 text-yellow-500" />
                      <span
                        className="cursor-pointer font-medium hover:underline"
                        onClick={() => handleFolderClick(item.name)}
                      >
                        {item.name}
                      </span>
                    </>
                  ) : (
                    <>
                      {getFileIcon(item.fileType)}
                      <Link href="#" className="font-medium hover:underline">
                        {item.name}
                      </Link>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell>{formatDate(item.modifiedAt)}</TableCell>
              <TableCell>{item.type === "file" ? formatBytes(item.size) : "—"}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

