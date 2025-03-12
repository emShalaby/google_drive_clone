export interface FileItem {
  id:string
  type: "file"
  name: string
  fileType: "document" | "image" | "archive" | "audio" | "video" | "other"
  size: number
  modifiedAt: Date
  createdAt: Date
  url: string
  parent?:string
}

export interface FolderItem {
  id:string
  type: "folder"
  name: string
  modifiedAt: Date
  createdAt: Date
  parent:string | null
}

// Generate a mock file system with folders and files

export const folders: FolderItem[] = [
  {
    id: "root",
    type: "folder",
    name: "My Drive",
    modifiedAt: new Date("2025-03-11T10:00:00Z"),
    createdAt: new Date("2025-01-01T12:00:00Z"),
    parent: null,
  },
  {
    id: "1",
    type: "folder",
    name: "Documents",
    modifiedAt: new Date("2025-03-10T15:30:00Z"),
    createdAt: new Date("2025-01-15T09:00:00Z"),
    parent: "root",
  },
  {
    id: "2",
    type: "folder",
    name: "Photos",
    modifiedAt: new Date("2025-03-09T14:00:00Z"),
    createdAt: new Date("2025-02-01T10:00:00Z"),
    parent: "root",
  },
  {
    id: "3",
    type: "folder",
    name: "Work",
    modifiedAt: new Date("2025-03-11T08:45:00Z"),
    createdAt: new Date("2025-02-15T13:00:00Z"),
    parent: "root",
  }
];
export const files: FileItem[] = [
  {
    id: "f1",
    type: "file",
    name: "resume.pdf",
    fileType: "document",
    size: 245760, // 240 KB
    modifiedAt: new Date("2025-03-11T09:15:00Z"),
    createdAt: new Date("2025-02-20T14:00:00Z"),
    url: "https://storage.example.com/files/f1",
    parent: "3" // Inside "Work" folder
  },
  {
    id: "f2",
    type: "file",
    name: "vacation.jpg",
    fileType: "image",
    size: 1048576, // 1 MB
    modifiedAt: new Date("2025-03-10T12:30:00Z"),
    createdAt: new Date("2025-02-05T16:00:00Z"),
    url: "https://storage.example.com/files/f2",
    parent: "root" // Inside "Photos" folder
  },
  {
    id: "f3",
    type: "file",
    name: "project.zip",
    fileType: "archive",
    size: 5242880, // 5 MB
    modifiedAt: new Date("2025-03-09T10:00:00Z"),
    createdAt: new Date("2025-01-25T11:00:00Z"),
    url: "https://storage.example.com/files/f3",
    parent: "1" // Inside "Documents" folder
  },
  {
    id: "f4",
    type: "file",
    name: "song.mp3",
    fileType: "audio",
    size: 4194304, // 4 MB
    modifiedAt: new Date("2025-03-11T11:00:00Z"),
    createdAt: new Date("2025-03-01T13:00:00Z"),
    url: "https://storage.example.com/files/f4",
    parent: "root" // Inside "Home" folder
  },
  {
    id: "f5",
    type: "file",
    name: "presentation.mp4",
    fileType: "video",
    size: 10485760, // 10 MB
    modifiedAt: new Date("2025-03-10T15:00:00Z"),
    createdAt: new Date("2025-02-15T09:30:00Z"),
    url: "https://storage.example.com/files/f5",
    parent: "3" // Inside "Work" folder
  }
];