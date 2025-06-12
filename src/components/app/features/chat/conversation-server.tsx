import { getMessagesByChatId } from "@/data/queries/message/get-messages-by-chatId";
import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import Conversation from "./conversation";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";

const fetchMessage= async(pageParam: number, chatId: string)=>{
  const supabase= await createClient();
      const data = await getMessagesByChatId(chatId, supabase, {
          offset: pageParam,
          limit: 10,
        })
      if(!data) throw new Error("Error fetching messages");
      return data
}

export default async function ConversationServer({ chatId }: { chatId: string }){
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["chat-messages", chatId],
    queryFn: async ({ pageParam = 0 }) => fetchMessage(pageParam, chatId),
    initialPageParam: 0,
  });
  const user=  await getUserSession()
  if(!user) return null
  const userId= user.user_id;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Conversation chatId={chatId} userId={userId}/>
    </HydrationBoundary>
  );
};
