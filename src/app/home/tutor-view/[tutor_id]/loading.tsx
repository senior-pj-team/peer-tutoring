import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="max-w-7xl mx-auto py-10 px-5 xl:px-20 flex flex-col md:flex-row gap-10 animate-pulse">
			{/* Left Profile Sidebar */}
			<div className="h-[80vh] w-full md:w-1/3 flex flex-col items-center md:items-start space-y-6">
				<Skeleton className="h-40 w-40 rounded-full" />

				<div className="space-y-3 w-full">
					<Skeleton className="h-5 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
				</div>

				<div className="space-y-2 w-full">
					<Skeleton className="h-10 w-full rounded-md" />
					<Skeleton className="h-10 w-full rounded-md" />
				</div>
			</div>

			{/* Right Content Section */}
			<div className="w-full md:w-2/3 space-y-6">
				<Skeleton className="h-10 w-1/3" />
				<Skeleton className="h-28 w-full rounded-md" />

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<Skeleton className="h-16 w-full rounded-md" />
					<Skeleton className="h-16 w-full rounded-md" />
					<Skeleton className="h-16 w-full rounded-md" />
					<Skeleton className="h-16 w-full rounded-md" />
				</div>

				<div className="space-y-4 mt-6">
					<Skeleton className="h-4 w-1/2" />
					<Skeleton className="h-4 w-3/4" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
				</div>
			</div>
		</div>
	);
}
