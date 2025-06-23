"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { nanoid } from "nanoid";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageInput from "./message-input";
import EmptyChat from "./empty-chat";

import { insertMessage } from "@/data/mutations/message/insert-message";
import { updateMessagesAsRead } from "@/data/mutations/message/update-message-as-read";
import { useSupabase } from "@/hooks/use-supabase";
import { useMessageRealtime } from "@/hooks/use-message-realtime";
import { useInfiniteMessage } from "@/hooks/use-infinite-messages";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";

const Conversation = ({
  chatId,
  userId,
  userProfile,
  userName,
}: {
  chatId: string;
  userId: string;
  userProfile: string | null;
  userName: string;
}) => {
  const [msg, setMsg] = useState("");
  const supabase = useSupabase();
  const scrollRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, isError } =
    useInfiniteMessage({ chatId });

  const mutation = useMutation({
    mutationFn: async ({ id, message }: { id: string; message: string }) => {
      const result = await insertMessage(message, userId, chatId, supabase);
      return { id, result };
    },
    onMutate: async ({ id, message }) => {
      await queryClient.cancelQueries({ queryKey: ["chat-messages", chatId] });
      queryClient.setQueryData<any>(["chat-messages", chatId], (old: any) => {
        if (!old) return old;

        const updatedFirstPage = old.pages[0].filter((msg: any) => msg.id !== id); //optional

        return {
          ...old,
          pages: [
            [
              {
                id,
                message,
                sender_id: userId,
                chat_id: chatId,
                sent_at: new Date().toISOString(),
                isRead: false,
                status: "sending",
              },
              ...updatedFirstPage,
            ],
            ...old.pages.slice(1),
          ],
        };
      });
      return {};
    },
    onError: (error, { id }) => {
      console.error("Send failed:", error.message);
      queryClient.setQueryData(["chat-messages", chatId], (old: any) => {
        return {
          ...old,
          pages: old.pages.map((page: any) =>
            page.map((msg: any) =>
              msg.id === id ? { ...msg, status: "failed" } : msg
            )
          ),
        };
      });
    },
  });

  const handleInsertMessage = useCallback((newMsg: TMessage) => {
    if (newMsg.sender_id != userId) updateMessagesAsRead(chatId, userId, supabase, {});
    queryClient.invalidateQueries({ queryKey: ["chat-messages", chatId] });
  }, [chatId, userId, supabase, queryClient]);

  const handleUpdateMessage = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["chat-messages", chatId] });
  }, [chatId, queryClient]);

  useMessageRealtime(supabase, chatId, handleInsertMessage, handleUpdateMessage);

  const msgArray = useMemo(() => data?.pages.flat() || [], [data]);

  const lastSeenMessageId = useMemo(() => {
    const sentByUser = msgArray.filter((m) => m.sender_id === userId && m.isRead);
    return sentByUser.length > 0 ? sentByUser[0].id : null;
  }, [msgArray, userId]);

  const onSend = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    if (!msg.trim()) return;
    const id = nanoid();
    mutation.mutate({ id, message: msg });
    setMsg("");
  };

  const onResend = (id: string, message: string) => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    mutation.mutate({ id, message });
  };

  useEffect(() => {
    updateMessagesAsRead(chatId, userId, supabase, {});
  }, [chatId, userId]);

  return (
    <div className="flex flex-col h-[46.5rem] bg-gray-50 border-l shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pb-4 pt-6 border-b bg-white">
        <Avatar>
          <AvatarImage
            src={userProfile ?? ""}
            width={56}
            height={56}
            alt="User Avatar"
          />
          <AvatarFallback>{getAvatarFallback(userName)}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold text-orange-800">{userName}</h2>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 flex flex-col-reverse gap-4"
      >
        {msgArray.length === 0 && <EmptyChat />}

        {msgArray.map((msg) => {
          const isSender = msg.sender_id === userId;
          const sentAt = msg.sent_at
            ? format(parseISO(msg.sent_at), "MMMM dd hh:mm a")
            : "---";
          const showSeen = isSender && msg.id === lastSeenMessageId;

          return (
            <div key={msg.id} className="flex flex-col items-end gap-1">
              <div
                className={`max-w-[75%] p-3 rounded-xl shadow text-sm break-words transition-transform duration-100 active:scale-[0.98] ${isSender
                    ? "ml-auto bg-orange-500 text-white"
                    : "mr-auto bg-orange-100 text-gray-800"
                  }`}
              >
                <div>{msg.message}</div>
                <div className="text-xs text-right opacity-70 mt-1">
                  {msg.status === "sending"
                    ? "Sending..."
                    : msg.status === "failed"
                      ? "Failed to send"
                      : sentAt}
                </div>
                {msg.status === "failed" && (
                  <div className="text-xs text-red-600 text-right mt-1">
                    <button
                      onClick={() => onResend(msg.id, msg.message)}
                      className="underline hover:text-red-800 active:scale-95"
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
              {showSeen && (
                <div className="text-xs text-orange-600 mt-1 pr-2">Seen</div>
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

        {
          isError && !isFetchingNextPage && (
            <div className="text-center text-sm text-red-600 mb-2">
              Failed to load messages. Please try again later.
            </div>
          )
        }
      </div>

      {/* Input */}
      <div className="border-t bg-white px-4 py-3">
        <MessageInput msg={msg} setMsg={setMsg} onSend={onSend} />
      </div>
    </div>
  );
};

export default Conversation;
