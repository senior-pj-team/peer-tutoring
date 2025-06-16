"use server";

import { insertChat } from "@/data/mutations/chat/insert-chat";
import { insertChatParticipants } from "@/data/mutations/chat_participant/insert-chat-participant";
import { getChatByOneToOneKey } from "@/data/queries/chat/get-chat-by-one-to-one-key";
import { getUserSession } from "@/utils/app/get-user-session";
import { createClient } from "@/utils/supabase/server";

export async function getOrCreateChat(
	user2_id: string,
): Promise<string | null> {
	const user = await getUserSession();
	const supabase = await createClient();
	if (!user || !supabase) return null;

	const user1_id = user.user_id;
	const one_to_one_key = [user1_id, user2_id].sort().join(":");
	// Try to get existing chat
	let chatId = await getChatByOneToOneKey(one_to_one_key, supabase);
	if (!chatId) return null;

	if (chatId != "no data") {
		return chatId;
	}
	// Insert new chat
	chatId = await insertChat(one_to_one_key, supabase);
	if (!chatId) return null;

	// Insert participants
	const success = await insertChatParticipants(
		chatId,
		[user1_id, user2_id],
		supabase,
	);
	if (!success) return null;

	return chatId;
}
