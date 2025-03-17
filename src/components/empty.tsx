import { Upload } from "lucide-react";

export default function Empty() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-800/50 px-4 py-16 text-center">
      <div className="mb-6 rounded-full bg-gray-700/50 p-4">
        <Upload className="h-10 w-10 text-gray-400" />
      </div>

      <h3 className="mb-2 text-xl font-medium text-gray-200">
        This folder is empty
      </h3>
      <p className="mb-8 max-w-md text-gray-400">
        Upload files to keep them organized and accessible from anywhere
      </p>

      <div className="mt-8 text-sm text-gray-500">
        <p>Supported file types: Images, Documents, Videos, and more</p>
        <p className="mt-1">Maximum file size: 1GB</p>
      </div>
    </div>
  );
}
