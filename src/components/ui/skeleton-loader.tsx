export function SkeletonLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full animate-pulse ${className}`}>
      <div className="mb-6 h-8 w-3/4 rounded-md bg-gray-700" />
      <div className="mb-4 h-4 w-full rounded-md bg-gray-700" />
      <div className="mb-4 h-4 w-full rounded-md bg-gray-700" />
      <div className="mb-4 h-4 w-3/4 rounded-md bg-gray-700" />

      <div className="mb-8 mt-6 h-[1px] w-full bg-gray-800" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-700 bg-gray-800 p-4"
          >
            <div className="mb-3 h-32 rounded-md bg-gray-700" />
            <div className="mb-2 h-4 w-3/4 rounded-md bg-gray-700" />
            <div className="h-4 w-1/2 rounded-md bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
