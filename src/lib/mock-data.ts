export interface FileItem {
  type: "file"
  name: string
  fileType: "document" | "image" | "archive" | "audio" | "video" | "other"
  size: number
  modifiedAt: Date
  createdAt: Date
}

export interface FolderItem {
  type: "folder"
  name: string
  items: (FileItem | FolderItem)[]
  modifiedAt: Date
  createdAt: Date
}

// Generate a mock file system with folders and files
export const mockFileSystem: FolderItem = {
  type: "folder",
  name: "My Drive",
  modifiedAt: new Date("2023-11-15T14:30:00"),
  createdAt: new Date("2023-01-01T09:00:00"),
  items: [
    {
      type: "folder",
      name: "Documents",
      modifiedAt: new Date("2023-11-10T11:20:00"),
      createdAt: new Date("2023-01-05T10:15:00"),
      items: [
        {
          type: "file",
          name: "Project Proposal.docx",
          fileType: "document",
          size: 2500000,
          modifiedAt: new Date("2023-11-10T11:20:00"),
          createdAt: new Date("2023-10-25T09:30:00"),
        },
        {
          type: "file",
          name: "Budget 2023.xlsx",
          fileType: "document",
          size: 1800000,
          modifiedAt: new Date("2023-10-15T16:45:00"),
          createdAt: new Date("2023-09-30T14:20:00"),
        },
        {
          type: "file",
          name: "Meeting Notes.pdf",
          fileType: "document",
          size: 950000,
          modifiedAt: new Date("2023-11-05T10:30:00"),
          createdAt: new Date("2023-11-01T15:00:00"),
        },
        {
          type: "folder",
          name: "Reports",
          modifiedAt: new Date("2023-10-20T13:15:00"),
          createdAt: new Date("2023-02-15T11:30:00"),
          items: [
            {
              type: "file",
              name: "Q3 Report.pdf",
              fileType: "document",
              size: 3200000,
              modifiedAt: new Date("2023-10-20T13:15:00"),
              createdAt: new Date("2023-10-10T09:45:00"),
            },
            {
              type: "file",
              name: "Annual Review.docx",
              fileType: "document",
              size: 4100000,
              modifiedAt: new Date("2023-09-25T11:00:00"),
              createdAt: new Date("2023-09-20T16:30:00"),
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      name: "Images",
      modifiedAt: new Date("2023-11-12T09:45:00"),
      createdAt: new Date("2023-01-10T13:20:00"),
      items: [
        {
          type: "file",
          name: "Profile Photo.jpg",
          fileType: "image",
          size: 3500000,
          modifiedAt: new Date("2023-11-12T09:45:00"),
          createdAt: new Date("2023-11-10T08:30:00"),
        },
        {
          type: "file",
          name: "Team Photo.png",
          fileType: "image",
          size: 5200000,
          modifiedAt: new Date("2023-10-30T14:20:00"),
          createdAt: new Date("2023-10-28T11:15:00"),
        },
        {
          type: "file",
          name: "Product Banner.jpg",
          fileType: "image",
          size: 2800000,
          modifiedAt: new Date("2023-11-05T16:30:00"),
          createdAt: new Date("2023-11-01T10:45:00"),
        },
        {
          type: "folder",
          name: "Vacation Photos",
          modifiedAt: new Date("2023-09-15T12:30:00"),
          createdAt: new Date("2023-08-10T09:15:00"),
          items: [
            {
              type: "file",
              name: "Beach.jpg",
              fileType: "image",
              size: 4200000,
              modifiedAt: new Date("2023-09-15T12:30:00"),
              createdAt: new Date("2023-08-25T16:45:00"),
            },
            {
              type: "file",
              name: "Mountains.jpg",
              fileType: "image",
              size: 3900000,
              modifiedAt: new Date("2023-09-10T10:15:00"),
              createdAt: new Date("2023-08-20T14:30:00"),
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      name: "Videos",
      modifiedAt: new Date("2023-10-25T15:40:00"),
      createdAt: new Date("2023-02-05T11:45:00"),
      items: [
        {
          type: "file",
          name: "Product Demo.mp4",
          fileType: "video",
          size: 158000000,
          modifiedAt: new Date("2023-10-25T15:40:00"),
          createdAt: new Date("2023-10-20T13:30:00"),
        },
        {
          type: "file",
          name: "Team Meeting.mp4",
          fileType: "video",
          size: 210000000,
          modifiedAt: new Date("2023-10-15T11:20:00"),
          createdAt: new Date("2023-10-10T09:45:00"),
        },
      ],
    },
    {
      type: "file",
      name: "Project Archive.zip",
      fileType: "archive",
      size: 45000000,
      modifiedAt: new Date("2023-11-08T10:15:00"),
      createdAt: new Date("2023-11-05T14:30:00"),
    },
    {
      type: "file",
      name: "Presentation.pptx",
      fileType: "document",
      size: 8500000,
      modifiedAt: new Date("2023-11-14T13:45:00"),
      createdAt: new Date("2023-11-10T16:20:00"),
    },
    {
      type: "file",
      name: "Company Podcast.mp3",
      fileType: "audio",
      size: 65000000,
      modifiedAt: new Date("2023-10-30T09:30:00"),
      createdAt: new Date("2023-10-25T14:15:00"),
    },
  ],
}

