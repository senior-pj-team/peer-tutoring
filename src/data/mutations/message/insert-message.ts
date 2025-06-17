export async function insertMessage(
  message: string,
  sender_id: string,
  chat_id: string,
  supabase: TSupabaseClient
): Promise<Boolean> {
  const { data, error } = await supabase
    .from("message")
    .insert({
      message,
      sender_id,
      chat_id,
    })
    .single();

  if (error || !data) {
    console.log("Error: ", error.message);
    return false
  }

  return true;
}
