"use client"

import type React from "react"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

interface UploadButtonProps {
  currentPath: string[]
}

export function UploadButton({ currentPath }: UploadButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files)
    }
  }

  const handleUpload = async () => {
    if (!files) return

    setUploading(true)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, you would upload the files to your backend here
    console.log("Uploading files to path:", currentPath.join("/"))
    console.log(
      "Files:",
      Array.from(files).map((f) => f.name),
    )

    setUploading(false)
    setIsOpen(false)
    setFiles(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload files</DialogTitle>
          <DialogDescription>
            Upload files to {currentPath.length > 0 ? `/${currentPath.join("/")}` : "My Drive"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="files">Select files</Label>
            <Input id="files" type="file" multiple onChange={handleFileChange} />
          </div>
          {files && (
            <div className="rounded-md bg-muted p-3">
              <p className="font-medium">Selected files:</p>
              <ul className="mt-2 list-inside list-disc">
                {Array.from(files).map((file, index) => (
                  <li key={index} className="text-sm">
                    {file.name} ({formatBytes(file.size)})
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Button onClick={handleUpload} disabled={!files || uploading} className="w-full">
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Helper function to format bytes
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

