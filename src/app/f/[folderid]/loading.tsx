import { Skeleton } from "~/components/ui/skeleton";

export default function DriveLoading() {
  return (
    <div className="mx-auto max-w-[2000px] p-4">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
          <div
            key={id}
            className="flex flex-col items-center rounded-lg border border-gray-800 bg-gray-900 p-4"
          >
            <Skeleton className="h-16 w-16 rounded-lg" />
            <Skeleton className="mt-2 h-4 w-24" />
            <Skeleton className="mt-1 h-3 w-16" />
          </div>
        ))}
      </div>

      <div className="hidden">
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-900 p-4"
            >
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="mt-1 h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
