"use client";

import type React from "react";
import { useState } from "react";
import { FolderPlus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { CreateFolder } from "~/server/actions";

interface AddFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  parentId: number;
}

export function AddFolderDialog({
  isOpen,
  onClose,
  parentId,
}: AddFolderDialogProps) {
  const [folderName, setFolderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", folderName);
      formData.append("parentId", parentId.toString());
      await CreateFolder(formData);
      setFolderName("");
    } catch (error) {
      console.error("Error creating folder:", error);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-gray-700 bg-gray-800 text-gray-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderPlus className="h-5 w-5 text-purple-400" />
            Create New Folder
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter a name for your new folder.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-gray-300">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="My New Folder"
                className="col-span-3 border-gray-600 bg-gray-700 text-gray-100 focus:border-purple-500 focus:ring-purple-500"
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-black hover:bg-gray-700 hover:text-white"
            >
              Close
            </Button>
            <Button
              type="submit"
              disabled={!folderName.trim() || isSubmitting}
              className="bg-purple-600 text-white hover:bg-purple-700"
            >
              {isSubmitting ? "Creating..." : "New Folder"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
