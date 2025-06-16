import { getMessagesByChatId } from "@/data/queries/message/get-messages-by-chatId";
import { createClient } from "../supabase/client";

export const LIMIT = 10;
export const fetchMessage= async({
	pageParam = 0,
	chatId,
	supabase,
}: {
	pageParam: number;
	chatId: string;
	supabase: TSupabaseClient; 
})=>{
      const data = await getMessagesByChatId(chatId, supabase, {
          offset: pageParam,
          limit: LIMIT,
        })
      if(!data) throw new Error("Error fetching messages");
      return data
}