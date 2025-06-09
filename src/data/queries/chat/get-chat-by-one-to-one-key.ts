export async function getChatByOneToOneKey(
  one_to_one_key: string,
  supabase: TSupabaseClient
): Promise<string | null> {
  const { data: chat, error } = await supabase
    .from("chat")
    .select("id")
    .eq("type", "one_to_one")
    .eq("one_to_one_key", one_to_one_key)
    .single();

  if (error && error.code !== "PGRST116") {
    console.log("error fetching chat:", error);
    return null;
  }
  if(error && error.code == "PGRST116"){
    console.log("No chat found", error);
    return "no data";
  }

  return chat ? chat.id : null;
}


