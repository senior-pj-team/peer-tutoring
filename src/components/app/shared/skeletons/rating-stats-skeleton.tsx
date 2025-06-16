import { Skeleton } from "@/components/ui/skeleton";

export default function RatingStatsSkeleton() {
	return (
		<div className="mt-6 w-full max-w-md px-5 hidden md:block animate-pulse">
			<h3 className="text-lg font-semibold text-gray-800 mb-4">
				Rating Breakdown
			</h3>

			{[1, 2, 3, 4, 5].map((_, index) => (
				<div key={index} className="flex flex-col gap-1 mb-6">
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-2">
							{/* Star skeletons */}
							{Array.from({ length: 5 }).map((_, i) => (
								<Skeleton key={i} className="h-4 w-4 rounded" />
							))}
						</div>
						<Skeleton className="h-4 w-8" />
					</div>
					<div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
						<div
							className="h-full bg-gray-300 rounded-full"
							style={{ width: `${80 - index * 10}%` }}
						/>
					</div>
				</div>
			))}
		</div>
	);
}
