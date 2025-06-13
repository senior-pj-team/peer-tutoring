export async function getOrCreateChat(
    supabase: TSupabaseClient,
    user1_id: string,
    user2_id: string
): Promise<string | null> {
    const { data: chatId, error } = await supabase.rpc('get_or_create_chat', {
        user1_id: user1_id,
        user2_id: user2_id
    });

    if (error) {
        console.error("Error calling RPC:", error);
        return null;
    }
    return chatId;
}