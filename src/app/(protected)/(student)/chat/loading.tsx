import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<>
			{/* Mobile Loading Spinner */}
			<div className="lg:hidden h-screen mt-20">
				<div className="w-full flex items-center justify-center h-screen">
					<div className="flex gap-3 items-center">
						<div className="h-5 w-5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.35s]"></div>
						<div className="h-5 w-5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.25s]"></div>
						<div className="h-5 w-5 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
						<div className="h-5 w-5 bg-orange-400 rounded-full animate-bounce"></div>
					</div>
				</div>
			</div>

			{/* Desktop Skeleton */}
			<div className="hidden lg:grid grid-cols-4 mt-20 h-[90vh]">
				{/* Sidebar */}
				<aside className="w-full h-full border-r bg-white flex flex-col shadow-sm px-4 py-6 space-y-6 overflow-y-auto mt-3">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={i} className="flex items-center space-x-4">
							<Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-[200px] bg-gray-300" />
								<Skeleton className="h-4 w-[150px] bg-gray-300" />
							</div>
						</div>
					))}
				</aside>

				{/* Chat Area */}
				<div className="col-span-3 flex flex-col px-6 py-4">
					{/* Chat Header */}
					<div className="flex items-center gap-4 mb-30 mt-3">
						<Skeleton className="h-10 w-10 rounded-full bg-gray-300" />
						<Skeleton className="h-6 w-40 bg-gray-300" />
					</div>

					{/* Chat Messages */}
					<div className="flex-1 space-y-4 overflow-y-auto pr-4">
						{Array.from({ length: 8 }).map((_, i) => (
							<div
								key={i}
								className={`flex ${
									i % 2 === 0 ? "justify-start" : "justify-end"
								}`}
							>
								<Skeleton className="h-8 w-[200px] rounded-xl bg-gray-300" />
							</div>
						))}
					</div>

					{/* Message Input */}
					<div className="mt-6">
						<Skeleton className="h-12 w-full rounded-xl bg-gray-300" />
					</div>
				</div>
			</div>
		</>
	);
}
