import React from "react";
import Link from "next/link";
import ChatCard from "./chat-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getChatList } from "@/data/queries/chat/get-chat-list";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { formatDate, parseISO } from "date-fns";
import GeneralError from "../../shared/error";

const ChatList = async ({ selectedChatId }: { selectedChatId: string | null }) => {
  const user = await getUserSession();
  const supabase = await createClient(); 
  if(!user?.user_id) return <GeneralError/>
  const chats = await getChatList(user.user_id, supabase);
  if(!chats) return <GeneralError/>

  return (
    <aside className="w-full h-[90vh] border-r bg-white flex flex-col shadow-sm">
      {/* Header */}
      <div className="px-5 pb-5 pt-8 border-b">
        <h2 className="text-xl font-bold text-orange-700">Chats</h2>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 px-2 py-3">
        {chats.length > 0 ? (
          chats.map((chat) => {
            const lastSentAt = chat.last_sent_at
              ? formatDate(parseISO(chat.last_sent_at), "MMMM dd hh:mm a")
              : "";

            return (
              <Link
                key={chat.chat_uuid}
                href={`/chat/${chat.chat_uuid}`}
                className={`block px-2 py-2 rounded-lg transition-colors ${
                  selectedChatId === chat.chat_uuid
                    ? "bg-orange-100 border border-orange-300"
                    : "hover:bg-orange-50"
                }`}
              >
                <ChatCard
                  name={chat.chat_name}
                  chatProfileUrl={chat.chat_profile_url ?? ""}
                  lastMessage={chat.last_message ?? undefined}
                  lastSentAt={lastSentAt}
                />
              </Link>
            );
          })
        ) : (
          <div className="mt-20 flex flex-col items-center text-center text-gray-400 px-6">
            <svg
              className="h-16 w-16 mb-3 text-orange-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.833L3 20l.994-4.438A7.963 7.963 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-sm">No chats found</p>
          </div>
        )}
      </ScrollArea>
    </aside>
  );
};

export default ChatList;
