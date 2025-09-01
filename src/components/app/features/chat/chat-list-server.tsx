"use server";

import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { getChatList } from "@/data/queries/chat/get-chat-list";
import {
	HydrationBoundary,
	dehydrate,
	QueryClient,
} from "@tanstack/react-query";
import GeneralError from "../../shared/error";
import { ChatList } from "./chat-list"; // You must define this utility
export async function ChatListServer({
	selectedChatId,
}: {
	selectedChatId: string | null;
}) {
	const user = await getUserSession();
	const supabase = await createClient();

	if (!user?.user_id) return <GeneralError />;

	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["chat-list", user.user_id],
		queryFn: () => getChatList(user.user_id, supabase),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<HydrationBoundary state={dehydratedState}>
			<ChatList selectedChatId={selectedChatId} userId={user.user_id} />
		</HydrationBoundary>
	);
}
