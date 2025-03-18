"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";
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
import { rename } from "~/server/actions";
import { useRouter } from "next/navigation";

interface RenameFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  type: "folder" | "file";
}

export function RenameDialog({
  isOpen,
  onClose,
  id,
  type,
}: RenameFolderDialogProps) {
  const [folderName, setFolderName] = useState("");
  const navigate = useRouter();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-gray-700 bg-gray-800 text-gray-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="h-5 w-5 text-purple-400" />
            New name
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter a new name.
          </DialogDescription>
        </DialogHeader>
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
            Cancel
          </Button>
          <Button
            type="button"
            disabled={!folderName.trim()}
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={async () => {
              onClose();
              await rename(id, type, folderName.trim());
              navigate.refresh();
            }}
          >
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
