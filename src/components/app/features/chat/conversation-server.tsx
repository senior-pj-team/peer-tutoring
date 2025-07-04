import {
	HydrationBoundary,
	dehydrate,
	QueryClient,
} from "@tanstack/react-query";
import Conversation from "./conversation";
import { getUserSession } from "@/utils/get-user-session";
import { fetchMessage } from "@/utils/app/fetch-messages";
import { createClient } from "@/utils/supabase/server";
import GeneralError from "../../shared/error";
import { getOtherChatParticipant } from "@/data/queries/chat/get-other-chat-participant";

export default async function ConversationServer({
	chatId,
}: {
	chatId: string;
}) {
	const supabase = await createClient();
	const queryClient = new QueryClient();

	await queryClient.prefetchInfiniteQuery({
		queryKey: ["chat-messages", chatId],
		queryFn: async ({ pageParam = 0 }) =>
			fetchMessage({ pageParam, chatId, supabase }),
		initialPageParam: 0,
	});
	const user = await getUserSession();
	if (!user) return <GeneralError />;
	const userId = user.user_id;

	const otherUser = await getOtherChatParticipant(chatId, userId, supabase);

	if (!otherUser || !otherUser.username) return <GeneralError />;

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Conversation
				chatId={chatId}
				userId={userId}
				userProfile={otherUser.profile_url}
				userName={otherUser.username}
			/>
		</HydrationBoundary>
	);
}
