import { Skeleton } from "@/components/ui/skeleton";

export function SessionsSkeleton({ title }: { title?: string }) {
	return (
		<div className="mt-5 px-10 w-full h-85 ">
			<div className="text-3xl font-bold tracking-wider">
				<span>{title}</span>
			</div>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4 gap-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<div className="flex flex-col gap-y-3" key={index}>
						<Skeleton className="w-full h-50 rounded-md" />
						<div className="space-y-2">
							<Skeleton className="w-[60%] h-4 rounded-xl" />
							<Skeleton className="w-[40%] h-4 rounded-xl" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
