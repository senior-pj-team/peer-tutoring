import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
	return (
		<div className="grid w-full items-center gap-y-8 mb-70">
			<div className="grid w-full items-center gap-y-2">
				<Skeleton className="w-32 h-3" />
				<Skeleton className="w-full h-7" />
			</div>
			<div className="grid w-full items-center gap-y-2">
				<Skeleton className="w-32 h-3" />
				<Skeleton className="w-full h-7" />
			</div>
			<div className="grid w-full items-center gap-y-2">
				<Skeleton className="w-32 h-3" />
				<Skeleton className="w-full h-7" />
			</div>
			<div className="grid w-full items-center gap-y-2">
				<Skeleton className="w-32 h-3" />
				<Skeleton className="w-full h-7" />
			</div>
		</div>
	);
}
