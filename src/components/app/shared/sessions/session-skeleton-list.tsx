import { Skeleton } from "@/components/ui/skeleton";

export function SessionSkeletonList() {
	return (
		<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
			{Array.from({ length: 5 }).map((_, index) => (
				<div className="flex flex-col gap-y-3" key={index}>
					<Skeleton className="w-full h-50 rounded-md" />
					<div className="space-y-2">
						<Skeleton className="w-[60%] h-4 rounded-xl" />
						<Skeleton className="w-[40%] h-4 rounded-xl" />
					</div>
				</div>
			))}
		</div>
	);
}
