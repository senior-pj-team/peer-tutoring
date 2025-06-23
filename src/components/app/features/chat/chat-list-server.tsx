import { createClient } from "@/utils/supabase/client";
import { getChatList } from "@/data/queries/chat/get-chat-list";
import { getUserSession } from "@/utils/get-user-session";
import GeneralError from "../../shared/error";
import { ChatList } from "./chat-list";

export async function ChatListServer({
	selectedChatId,
}: {
	selectedChatId: string | null;
}) {
	const user = await getUserSession();
	const supabase = createClient();
	if (!user) return <GeneralError />;

	const initialChats = await getChatList(user.user_id, supabase);
	if (!initialChats) return <GeneralError />;

	return (
		<ChatList
			initialChats={initialChats}
			selectedChatId={selectedChatId}
			userId={user.user_id}
		/>
	);
}
