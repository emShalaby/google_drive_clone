"use client";

import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-900 p-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gray-800 p-6">
            <FileQuestion className="h-16 w-16 text-purple-400" />
          </div>
        </div>

        <h1 className="mb-2 text-4xl font-bold text-gray-100">404</h1>
        <h2 className="mb-4 text-xl font-semibold text-gray-100">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-400">
          The page you&aposre looking for doesn&apost exist or has been moved.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            <Link href="/">Go Home</Link>
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
