import { FolderPlus } from "lucide-react";
import { Button } from "~/components/ui/button";

export function AddFolderButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="border-gray-600 bg-gray-700 text-gray-200"
      {...props}
    >
      <FolderPlus className="mr-2 h-4 w-4" />
      New Folder
    </Button>
  );
}
