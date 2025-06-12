export async function updateMessagesAsRead(
  chatId: string,
  userId: string,
  supabase: TSupabaseClient,{
    message_id
  }:{
    message_id?: string
  }
) {
  const query=  supabase
    .from("message")
    .update({ isRead: true })
    .eq("chat_id", chatId)
    .neq("sender_id", userId)
    .eq("isRead", false);
    if(message_id) query.eq('id', message_id)
    const { error } = await query;

  if (error) {
    console.error("Failed to update read status:", error.message);
  }
}
