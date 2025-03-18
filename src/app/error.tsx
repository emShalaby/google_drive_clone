"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-900 p-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gray-800 p-6">
            <AlertTriangle className="h-16 w-16 text-red-500" />
          </div>
        </div>

        <h2 className="mb-4 text-xl font-semibold text-gray-100">
          Something went wrong!
        </h2>

        <p className="mb-2 text-gray-400">An unexpected error occurred.</p>

        {error.digest && (
          <p className="mb-8 text-sm text-gray-500">Error ID: {error.digest}</p>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            onClick={() => reset()}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Try Again
          </Button>

          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="border-gray-700 text-black hover:bg-gray-800 hover:text-white"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
