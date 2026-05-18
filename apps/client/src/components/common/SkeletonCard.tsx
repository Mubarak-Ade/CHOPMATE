import { Skeleton } from "../ui/skeleton";

export const SkeletonCard = () => (
  <div aria-hidden="true" className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
    <Skeleton className="h-56 rounded-none" />
    <div className="space-y-4 p-5">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);
