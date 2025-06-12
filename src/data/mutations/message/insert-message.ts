export async function insertMessage(
  message: string,
  sender_id: string,
  chat_id: string,
  supabase: TSupabaseClient
): Promise<TMessage> {
  const { data, error } = await supabase
    .from("message")
    .insert({
      message,
      sender_id,
      chat_id,
    })
    .select()
    .single();

  if (error || !data) {
    console.log("Insert error: ", error.message);
    throw new Error(error?.message || "Failed to insert message");
  }

  return data as TMessage;
}
