import { Skeleton } from "@/components/ui/skeleton";

export function FinancialStatsCardsSkeleton() {
	return (
		<div className="*:data-[slot=card]:shadow-lg  @xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 dark:*:data-[slot=card]:bg-card">
			<div className="@container/card py-3 shadow-md rounded-md px-2">
				<Skeleton className="w-[50%] h-4 mb-4 rounded-3xl" />
				<Skeleton className="w-30 h-10 mb-5 rounded-xl" />
				<Skeleton className="w-[65%] h-4 mb-2 rounded-3xl" />
				<Skeleton className="w-20 h-3 rounded-3xl mb-2" />
				<Skeleton className="w-[65%] h-3 rounded-3xl" />
			</div>
			<div className="@container/card py-3 shadow-md rounded-md px-2">
				<Skeleton className="w-[50%] h-4 mb-4 rounded-3xl" />
				<Skeleton className="w-30 h-10 mb-5 rounded-xl" />
				<Skeleton className="w-[65%] h-4 mb-2 rounded-3xl" />
				<Skeleton className="w-20 h-3 rounded-3xl mb-2" />
				<Skeleton className="w-[65%] h-3 rounded-3xl" />
			</div>
			<div className="@container/card py-3 shadow-md rounded-md px-2">
				<Skeleton className="w-[50%] h-4 mb-4 rounded-3xl" />
				<Skeleton className="w-30 h-10 mb-5 rounded-xl" />
				<Skeleton className="w-[65%] h-4 mb-2 rounded-3xl" />
				<Skeleton className="w-20 h-3 rounded-3xl mb-2" />
				<Skeleton className="w-[65%] h-3 rounded-3xl" />
			</div>
		</div>
	);
}
