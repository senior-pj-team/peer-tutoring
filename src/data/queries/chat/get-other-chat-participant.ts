export async function getOtherChatParticipant(chatId: string, userId: string, supabase: TSupabaseClient): Promise<TOtherUser | null> {
    const { data: user, error } = await supabase.rpc("get_other_participant", {
        p_chat_id: chatId,
        p_user_id: userId,
    });

    if(error) {
        console.log("error: ",error.message);
        return null;
    }

    return user;
}