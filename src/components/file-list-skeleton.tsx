export function FileListSkeleton({
  view = "grid",
}: {
  view?: "grid" | "list";
}) {
  if (view === "grid") {
    return (
      <div className="mb-5 grid w-full animate-pulse grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-md border border-gray-700 bg-gray-800"
          >
            <div className="h-32 bg-gray-700" />
            <div className="p-3">
              <div className="mb-2 h-4 rounded bg-gray-700" />
              <div className="h-3 w-1/2 rounded bg-gray-700" />
            </div>
            <div className="border-t border-gray-700 p-2">
              <div className="flex justify-end">
                <div className="h-8 w-8 rounded-full bg-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-5 animate-pulse rounded-md border border-gray-700 bg-gray-800">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="bg-gray-900 p-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="h-6 rounded bg-gray-700" />
              <div className="h-6 rounded bg-gray-700" />
              <div className="h-6 rounded bg-gray-700" />
              <div className="h-6 w-12 rounded bg-gray-700" />
            </div>
          </div>
          <div className="divide-y divide-gray-700">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="p-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-gray-700" />
                    <div className="h-4 w-3/4 rounded bg-gray-700" />
                  </div>
                  <div className="h-4 w-1/2 rounded bg-gray-700" />
                  <div className="h-4 w-1/4 rounded bg-gray-700" />
                  <div className="flex justify-end">
                    <div className="h-8 w-8 rounded-full bg-gray-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
