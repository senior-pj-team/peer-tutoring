"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { getOrCreateChat } from "@/data/mutations/chat/get-or-create-chat";
import { createClient } from "@/utils/supabase/client";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function GoToChatButton({
	user1_id,
	user2_id,
	size = 24,
}: {
	user1_id: string | null;
	user2_id: string | null;
	size?: number;
}) {
	const router = useRouter();
	const handleClick = async () => {
		const supabase = createClient();
		if (!user2_id || !user1_id) return null;
		const chatId = await getOrCreateChat(supabase, user1_id, user2_id);
		if (!chatId) return;
		router.push(`/chat/${chatId}`);
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<MessageCircle
					size={size}
					className="text-orange-500 cursor-pointer hover:text-orange-600"
					onClick={handleClick}
				/>
			</TooltipTrigger>
			<TooltipContent>
				<p>Go to Chat</p>
			</TooltipContent>
		</Tooltip>
	);
}
