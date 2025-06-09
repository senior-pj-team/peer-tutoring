export async function insertMessage(
  message: string,
  sender_id: string,
  chat_id: string,
  supabase: TSupabaseClient
): Promise<boolean | null> {
  const { data, error } = await supabase.from("message").insert({
    message,
    sender_id,
    chat_id,
  });
  if (error) {
    console.log("Insert error: ", error.message);
    return null;
  }
  return true;
}
