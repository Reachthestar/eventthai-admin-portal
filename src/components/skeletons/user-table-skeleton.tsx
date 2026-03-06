import { Skeleton } from "@/components/ui/skeleton";

export const UserTableSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col justify-between gap-5 rounded-2xl border border-border/50 bg-card p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="size-16 shrink-0 rounded-2xl" />
            <div className="flex items-center gap-1.5">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="size-8 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-hidden py-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};
