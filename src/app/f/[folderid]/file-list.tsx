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
        return <FileIcon className="h-6 w-6 text-gray-400" />;
    }
  };

  if (view === "grid") {
    return (
      <>
        <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {folderItems.map((folder, index) => (
            <Card
              key={index}
              className="overflow-hidden border-gray-700 bg-gray-800"
            >
              <Link
                className="flex h-32 cursor-pointer flex-col items-center justify-center bg-gray-900 p-4"
                href={`/f/${folder.id}`}
              >
                <FolderIcon className="h-12 w-12 text-yellow-500" />
              </Link>
              <CardContent className="p-3">
                <div className="truncate font-medium text-gray-100">
                  <Link
                    className="cursor-pointer hover:underline"
                    href={`/f/${folder.id}`}
                  >
                    {folder.name}
                  </Link>
                </div>
                <div className="pt- text-xs text-gray-400">Folder</div>
              </CardContent>
              <CardFooter className="flex items-center justify-end border-t border-gray-700 p-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="border-gray-700 bg-gray-800 text-gray-100"
                  >
                    <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-400 hover:bg-gray-700 focus:bg-gray-700">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
          {fileItems.map((file, index) => (
            <Card
              key={index}
              className="overflow-hidden border-gray-700 bg-gray-800"
            >
              <div className="flex h-32 flex-col items-center justify-center bg-gray-900 p-4">
                {getFileIcon(file.fileType)}
              </div>

              <CardContent className="p-3">
                <div className="truncate font-medium text-gray-100">
                  <a
                    href={file.url}
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {file.name}
                  </a>
                </div>
                <div className="text-xs text-gray-400">
                  {formatBytes(file.size)}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-gray-700 p-2">
                <DropdownMenu>
                  <span className="text-xs text-gray-400">
                    Uploaded : {dayjs(file.createdAt).fromNow()}
                  </span>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="border-gray-700 bg-gray-800 text-gray-100"
                  >
                    <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-400 hover:bg-gray-700 focus:bg-gray-700"
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
        <div className="mb-5 rounded-md border border-gray-700 bg-gray-800">
          <Table>
            <TableHeader className="bg-gray-900">
              <TableRow className="border-gray-700 hover:bg-gray-800">
                <TableHead className="w-[400px] text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Uploaded</TableHead>
                <TableHead className="text-gray-300">Size</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {folderItems.map((folder, index) => (
                <TableRow
                  key={index}
                  className="border-gray-700 hover:bg-gray-700"
                >
                  <TableCell className="text-gray-100">
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
                  <TableCell className="text-gray-400"></TableCell>
                  <TableCell className="text-gray-400"></TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="border-gray-700 bg-gray-800 text-gray-100"
                      >
                        <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:bg-gray-700 focus:bg-gray-700">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {fileItems.map((file, index) => (
                <TableRow
                  key={index}
                  className="border-gray-700 hover:bg-gray-700"
                >
                  <TableCell className="text-gray-100">
                    <div className="flex items-center gap-2">
                      <>
                        {getFileIcon(file.fileType)}
                        <a
                          href={file.url}
                          className="font-medium hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {file.name}
                        </a>
                      </>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {dayjs(file.createdAt).fromNow()}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {formatBytes(file.size)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="border-gray-700 bg-gray-800 text-gray-100"
                      >
                        <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-400 hover:bg-gray-700 focus:bg-gray-700"
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
