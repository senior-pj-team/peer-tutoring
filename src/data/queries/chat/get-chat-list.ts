export async function getChatList(user_id: string, supabase: TSupabaseClient): Promise<TChatList | null>{
    const { data: chatList, error } = await supabase.rpc("get_chat_list", {
    user_id: user_id,
  });
  if(error){
    console.log("error", error.message);
    return null;
  }
  return chatList ? chatList : null;
}