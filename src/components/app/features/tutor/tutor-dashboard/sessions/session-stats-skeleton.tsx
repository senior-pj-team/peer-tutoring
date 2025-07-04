import { Skeleton } from "@/components/ui/skeleton";

export function SessionStatsSkeleton() {
	return (
		<div className="flex flex-col gap-3 px-4 lg:px-6">
			<div className="*:data-[slot=card]:shadow-lg  @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 dark:*:data-[slot=card]:bg-card">
				<div className="@container/card py-3 shadow-md rounded-md px-2">
					<Skeleton className="w-[50%] h-4 mb-4 rounded-3xl" />
					<Skeleton className="w-30 h-10 mb-3 rounded-xl" />
					<Skeleton className="w-[65%] h-4 mb-5 rounded-3xl" />
					<div className="flex gap-2 ">
						<Skeleton className="w-20 h-3 rounded-3xl" />
						<Skeleton className="w-20 h-3 rounded-3xl" />
					</div>
				</div>
				<div className="@container/card py-3 shadow-md rounded-md px-2">
					<Skeleton className="w-[50%] h-4 mb-4 rounded-3xl" />
					<Skeleton className="w-30 h-10 mb-3 rounded-xl" />
					<Skeleton className="w-[65%] h-4 mb-5 rounded-3xl" />
					<div className="flex gap-2 ">
						<Skeleton className="w-20 h-3 rounded-3xl" />
						<Skeleton className="w-20 h-3 rounded-3xl" />
					</div>
				</div>
				<div className="@container/card py-3 shadow-md rounded-md px-2">
					<Skeleton className="w-[50%] h-4 mb-4 rounded-3xl" />
					<Skeleton className="w-30 h-10 mb-3 rounded-xl" />
					<Skeleton className="w-[65%] h-4 mb-5 rounded-3xl" />
					<div className="flex gap-2 ">
						<Skeleton className="w-20 h-3 rounded-3xl" />
						<Skeleton className="w-20 h-3 rounded-3xl" />
					</div>
				</div>
				<div className="@container/card py-3 shadow-md rounded-md px-2">
					<Skeleton className="w-[50%] h-4 mb-4 rounded-3xl" />
					<Skeleton className="w-30 h-10 mb-3 rounded-xl" />
					<Skeleton className="w-[65%] h-4 mb-5 rounded-3xl" />
					<div className="flex gap-2 ">
						<Skeleton className="w-20 h-3 rounded-3xl" />
						<Skeleton className="w-20 h-3 rounded-3xl" />
					</div>
				</div>
			</div>
		</div>
	);
}
