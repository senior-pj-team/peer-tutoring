import { getMessagesByChatId } from "@/data/queries/message/get-messages-by-chatId";

export const LIMIT = 10;
export const fetchMessage= async({
	pageParam = 0,
	chatId,
	supabase,
}: {
	pageParam: number;
	chatId: string;
	supabase: TSupabaseClient; 
}): Promise<TMessageWithStatus[]>=>{
      const data = await getMessagesByChatId(chatId, supabase, {
          offset: pageParam,
          limit: LIMIT,
        })
	  if(!data) throw new Error("Error fetching messages");
    const result= data.map((msg: TMessage) => ({ ...msg, status: "sent" }))
	  return result;
}