import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ConversationLoading = () => {
	return (
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
						className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
						<Skeleton className="h-8 w-[200px] rounded-xl bg-gray-300" />
					</div>
				))}
			</div>

			{/* Message Input */}
			<div className="mt-6">
				<Skeleton className="h-12 w-full rounded-xl bg-gray-300" />
			</div>
		</div>
	);
};

export default ConversationLoading;
