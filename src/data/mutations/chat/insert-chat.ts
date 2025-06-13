export async function insertChat(
  one_to_one_key: string,
  supabase: TSupabaseClient
): Promise<string | null> {
  const { data: newChat, error } = await supabase
    .from("chat")
    .insert({
      type: "one_to_one",
      one_to_one_key,
    })
    .select("id")
    .single();

  if (error) {
    console.log("error inserting chat:", error);
    return null
  }

  return newChat.id;
}