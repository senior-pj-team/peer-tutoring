export async function getUnreadMessageCount(supabase: TSupabaseClient, userId: string): Promise<number| null>{
    const { data: count, error } = await supabase.rpc("get_unread_message_count", {
        p_user_id: userId,
    });

    if (error) {
        console.error("Error fetching unread count via RPC:", error);
        return null;
    }

    return count
}