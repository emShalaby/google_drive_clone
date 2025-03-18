import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-900 p-4">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
        <h2 className="mt-4 text-xl font-medium text-gray-200">Loading...</h2>
        <p className="mt-2 text-sm text-gray-400">
          Please wait while we prepare your content
        </p>
      </div>
    </div>
  );
}
