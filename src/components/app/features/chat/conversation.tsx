"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessagesByChatId } from "@/data/queries/message/get-messages-by-chatId";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageInput from "./message-input";
import EmptyChat from "./empty-chat";
import { useState, useCallback } from "react";
import { formatDate, parseISO } from "date-fns";
import { insertMessage } from "@/data/mutations/message/insert-message";
import { useMessageRealtime } from "@/hooks/use-message-realtime";
import { useSupabase } from "@/hooks/use-supabase";

const PAGE_SIZE = 10;

const fetchMessages = async (pageParam: number, chatId: string, supabase: TSupabaseClient) => {
  const data = await getMessagesByChatId(chatId, supabase, {
    offset: pageParam,
    limit: PAGE_SIZE,
  });
  if (!data) throw new Error("Error fetching messages");
  return data;
};

const Conversation = ({ chatId, userId }: { chatId: string; userId: string }) => {
  const [msg, setMsg] = useState("");
  const [newMessages, setNewMessages] = useState<TMessage[]>([]);
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const supabase = useSupabase();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["chat-messages", chatId],
    queryFn: async ({ pageParam = 0 }) => fetchMessages(pageParam, chatId, supabase),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;
      return allPages.length * PAGE_SIZE;
    },
    initialPageParam: 0,
  });

  const handleNewMessage = useCallback(
    (newMsg: any) => {
      setNewMessages((prev) => {
        const exists = prev.find((m) => m.id === newMsg.id);
        if (exists) return prev;
        return [newMsg, ...prev];
      });

      // Remove matching local message (based on content)
      setLocalMessages((prev) =>
        prev.filter(
          (m) =>
            !(
              m.message === newMsg.message &&
              (m.status === "sending" || m.status === "sent")
            )
        )
      );
    },
    [setNewMessages, setLocalMessages]
  );

  // Subscribe to Realtime messages
  useMessageRealtime(supabase, chatId, handleNewMessage);

  // Final message list = localMessages first, then newMessages, then DB messages
  const messages = [
    ...localMessages,
    ...newMessages,
    ...(data?.pages.flat() ?? []),
  ];

  const onSend = async () => {
    if (msg.trim() !== "") {
      // Create temp message
      const tempId =
        "temp-" +
        Date.now() +
        "-" +
        Math.random().toString(36).substring(2, 9);

      const newLocalMessage = {
        id: tempId,
        sender_id: userId,
        message: msg,
        sent_at: new Date().toISOString(),
        status: "sending", // initial status
      };

      // Add to local messages
      setLocalMessages((prev) => [newLocalMessage, ...prev]);
      setMsg("");

      // Insert to DB
      const success = await insertMessage(msg, userId, chatId, supabase);
      console.log("send status: ", success);

      // Update local message status
      setLocalMessages((prev) =>
        prev.map((m) =>
          m.id === tempId
            ? {
                ...m,
                status: success ? "sent" : "error",
              }
            : m
        )
      );
    }
  };

  return (
    <div className="flex flex-col h-[46.5rem] bg-gray-50 border-l shadow-sm">
      {/* Chat Header */}
      <div className="flex items-center gap-4 px-6 pb-4 pt-6 border-b bg-white">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/profile.jpg" alt={"Chat"} />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold text-orange-800">Chat</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse gap-4">
        {messages.length === 0 && <EmptyChat />}

        {messages.map((msg, index) => {
          const isSender = msg.sender_id === userId;
          const sentAt = msg.sent_at
            ? formatDate(parseISO(msg.sent_at), "MMMM dd hh:mm a")
            : "---";

          return (
            <div
              key={msg.id || index}
              className={`max-w-[75%] p-3 rounded-xl shadow text-sm break-words ${
                isSender
                  ? "ml-auto bg-orange-500 text-white"
                  : "mr-auto bg-orange-100 text-gray-800"
              }`}
            >
              <div>{msg.message}</div>
              <div className="text-xs text-right opacity-70 mt-1">{sentAt}</div>

              {isSender && (
                <div className="text-[10px] text-right mt-0.5 opacity-60">
                  {msg.status === "sending"
                    ? "Sending..."
                    : msg.status === "sent"
                    ? "Sent"
                    : msg.status === "error"
                    ? "Failed to send"
                    : ""}
                </div>
              )}
            </div>
          );
        })}

        {hasNextPage && (
          <div className="flex justify-center mt-2">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="text-orange-600 font-medium py-2 px-6 border border-orange-300 rounded-lg hover:bg-orange-50 disabled:opacity-50"
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t bg-white px-4 py-3">
        <MessageInput msg={msg} setMsg={setMsg} onSend={onSend} />
      </div>
    </div>
  );
};

export default Conversation;
