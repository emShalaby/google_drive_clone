"use client";
import Link from "next/link";
import {
  FileIcon,
  FolderIcon,
  MoreVertical,
  FileImage,
  FileText,
  FileArchive,
  FileAudio,
  FileVideo,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { formatBytes } from "~/lib/utils";
import type { filesTable, foldersTable } from "~/server/db/schema";
import Empty from "~/components/empty";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { deleteFile } from "~/server/actions";
dayjs.extend(relativeTime);
interface FileListProps {
  folderItems: (typeof foldersTable.$inferSelect)[];
  fileItems: (typeof filesTable.$inferSelect)[];
  view: "grid" | "list";
}

export function FileList({ folderItems, fileItems, view }: FileListProps) {
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "image":
        return <FileImage className="h-6 w-6 text-blue-500" />;
      case "document":
        return <FileText className="h-6 w-6 text-green-500" />;
      case "archive":
        return <FileArchive className="h-6 w-6 text-yellow-500" />;
      case "audio":
        return <FileAudio className="h-6 w-6 text-purple-500" />;
      case "video":
        return <FileVideo className="h-6 w-6 text-red-500" />;
      default:
        return <FileIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  if (view === "grid") {
    return (
      <>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {folderItems.map((folder, index) => (
            <Card key={index} className="overflow-hidden">
              <Link
                className="flex h-32 cursor-pointer flex-col items-center justify-center bg-muted/50 p-4"
                href={`/f/${folder.id}`}
              >
                <FolderIcon className="h-12 w-12 text-yellow-500" />
              </Link>
              <CardContent className="p-3">
                <div className="truncate font-medium">
                  <Link
                    className="cursor-pointer hover:underline"
                    href={`/f/${folder.id}`}
                  >
                    {folder.name}
                  </Link>
                </div>
                <div className="pt- text-xs text-muted-foreground">Folder</div>
              </CardContent>
              <CardFooter className="flex items-center justify-end p-2">
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
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
          {fileItems.map((file, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="flex h-32 flex-col items-center justify-center bg-muted/50 p-4">
                {getFileIcon(file.fileType)}
              </div>

              <CardContent className="p-3">
                <div className="truncate font-medium">
                  <a
                    href={file.url}
                    className="hover:underline"
                    target="_blank"
                  >
                    {file.name}
                  </a>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatBytes(file.size)}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-2">
                <DropdownMenu>
                  <span className="text-xs">
                    Uploaded : {dayjs(file.createdAt).fromNow()}
                  </span>
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
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => deleteFile(file.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
        {[...folderItems, ...fileItems].length === 0 && <Empty />}
      </>
    );
  }

  return (
    <>
      {[...folderItems, ...fileItems].length === 0 ? (
        <Empty />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Name</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {folderItems.map((folder, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <>
                        <FolderIcon className="h-5 w-5 text-yellow-500" />
                        <Link
                          className="cursor-pointer font-medium hover:underline"
                          href={`/f/${folder.id}`}
                        >
                          {folder.name}
                        </Link>
                      </>
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
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
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {fileItems.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <>
                        {getFileIcon(file.fileType)}
                        <a
                          href={file.url}
                          className="font-medium hover:underline"
                          target="_blank"
                        >
                          {file.name}
                        </a>
                      </>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs(file.createdAt).fromNow()}</TableCell>
                  <TableCell>{formatBytes(file.size)}</TableCell>
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
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteFile(file.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
