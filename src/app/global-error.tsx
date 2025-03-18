"use client";

import { useEffect } from "react";
import { AlertOctagon } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-gray-900">
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-gray-800 p-6">
                <AlertOctagon className="h-16 w-16 text-red-500" />
              </div>
            </div>

            <h2 className="mb-4 text-xl font-semibold text-gray-100">
              Critical Error
            </h2>

            <p className="mb-2 text-gray-400">
              A critical error occurred while rendering the application.
            </p>

            {error.digest && (
              <p className="mb-8 text-sm text-gray-500">
                Error ID: {error.digest}
              </p>
            )}

            <div className="flex justify-center">
              <Button
                onClick={() => reset()}
                className="bg-purple-600 text-white hover:bg-purple-700"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
