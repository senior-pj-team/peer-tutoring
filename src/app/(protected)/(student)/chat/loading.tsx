import ChatListLoading from "@/components/app/shared/chat-list-loading";
import ConversationLoading from "@/components/app/shared/conversation-loading";
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
				<ChatListLoading />

				{/* Chat Area */}
				<ConversationLoading />
			</div>
		</>
	);
}
