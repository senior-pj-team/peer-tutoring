export async function getMessagesByChatId(
  chatId: string,
  supabase: TSupabaseClient,
  {
    offset,
    limit
  }: {
    offset?: number;
    limit?: number;
  }
): Promise<TMessage[] | null> {

  let query = supabase
    .from("message")
    .select("*")
    .eq("chat_id", chatId)
    .order("sent_at", { ascending: false });

  if (typeof offset === "number" && typeof limit === "number") {
    query = query.range(offset, offset + limit - 1);
  }

  const { data: messages, error } = await query;

  if (error) {
    console.error("Error fetching messages:", error);
    return null;
  }

  return messages;
}
