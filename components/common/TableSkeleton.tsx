import { Skeleton } from "@/components/ui/skeleton"

export function TableSkeleton({ 
  rows = 5, 
  hasSearch = true,
  hasPagination = true 
}: { 
  rows?: number
  hasSearch?: boolean
  hasPagination?: boolean
}) {
  return (
    <div className="space-y-4">
      {/* Search bar skeleton */}
      {hasSearch && (
        <div className="relative flex-1 max-w-md">
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {/* Table skeleton */}
      <div className="border rounded-lg overflow-hidden">
        {/* Header skeleton */}
        <div className="bg-gray-50 border-b p-4">
          <div className="flex gap-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 flex-1" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>

        {/* Rows skeleton */}
        <div className="divide-y">
          {Array.from({ length: rows }).map((_, index) => (
            <div key={index} className="p-4 flex items-center gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 flex-1" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination skeleton */}
      {hasPagination && (
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-40" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-24" />
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-8 w-8" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}