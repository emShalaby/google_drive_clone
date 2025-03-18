import { SkeletonLoader } from "~/components/ui/skeleton-loader";

export default function FolderLoading() {
  return (
    <div className="container mx-auto w-full bg-gray-900 p-4">
      <SkeletonLoader />
    </div>
  );
}
