'use client';

import { useMutation } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageInput from "./message-input";
import EmptyChat from "./empty-chat";
import { useState, useCallback, useEffect, useMemo } from "react";
import { format, parseISO } from "date-fns";
import { insertMessage } from "@/data/mutations/message/insert-message";
import { useMessageRealtime } from "@/hooks/use-message-realtime";
import { useSupabase } from "@/hooks/use-supabase";
import { nanoid } from "nanoid";
import { updateMessagesAsRead } from "@/data/mutations/message/update-message-as-read";
import { useInfiniteMessage } from "@/hooks/use-infinite-messages";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";

type TMessageStatus = "sending" | "sent" | "failed";

type TMessageWithStatus = TMessage & {
  status?: TMessageStatus;
  tempId?: string;
};

const Conversation = ({ chatId, userId, userProfile, userName }: { chatId: string; userId: string, userProfile: string | null, userName: string}) => {
  const [msg, setMsg] = useState("");
  const [newMessages, setNewMessages] = useState<TMessageWithStatus[]>([]);
  const supabase = useSupabase();

  const mutation = useMutation({
    mutationFn: async ({ message, tempId }: { message: string; tempId: string }) => {
      const result = await insertMessage(message, userId, chatId, supabase);
      return { result, tempId };
    },

    onMutate: async ({ message, tempId }) => {
      const optimisticMsg: TMessageWithStatus = {
        id: tempId,
        chat_id: chatId,
        sender_id: userId,
        message,
        sent_at: new Date().toISOString(),
        isRead: false,
        status: "sending",
        tempId,
      };
      setNewMessages((prev) => [optimisticMsg, ...prev]);
    },

    onSuccess: ({ result, tempId }) => {
      setNewMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === tempId ? { ...result, status: "sent", tempId } : msg
        )
      );
    },

    onError: (_, { tempId }) => {
      setNewMessages((prev) =>
        prev.map((msg) =>
          msg.tempId === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    },
  })

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteMessage({ chatId });

  const handleInsertMessage = useCallback(
    (newMsg: TMessage) => {
      if (!newMsg || !newMsg.id) return;

      setNewMessages((prev) => {
        const exists = prev.find((m) => m.id === newMsg.id);
        if (!exists) return [newMsg, ...prev];
        return prev;
      });

      if (newMsg.sender_id !== userId) {
        updateMessagesAsRead(chatId, userId, supabase, { message_id: newMsg.id });
      }
    },
    [chatId, userId, supabase]
  );

  const handleUpdateMessage = useCallback(
    (updatedMsg: TMessage) => {
      if (!updatedMsg || !updatedMsg.id) return;

      setNewMessages((prev) =>
        prev.map((msg) =>
          msg.id === updatedMsg.id ? { ...msg, ...updatedMsg } : msg
        )
      );
    },
    []
  );
  useMessageRealtime(supabase, chatId, handleInsertMessage, handleUpdateMessage);


  const fetchedMessagesWithStatus: TMessageWithStatus[] = (data?.pages.flat() ?? []).map(msg => ({
    ...msg,
    status: "sent",
  }));

  const combinedMessages = useMemo(() => {
    const seenIds = new Set<string>();
    const merged: TMessageWithStatus[] = [];

    [...newMessages, ...fetchedMessagesWithStatus].forEach((msg) => {
      const id = msg.id || msg.tempId!;
      if (!seenIds.has(id)) {
        seenIds.add(id);
        merged.push(msg);
      }
    });

    return merged;
  }, [newMessages, fetchedMessagesWithStatus]);

  const lastSeenMessageId = useMemo(() => {
    const sentByUser = combinedMessages.filter(m => m.sender_id === userId && m.isRead);
    return sentByUser.length > 0 ? sentByUser[0].id : null;
  }, [combinedMessages, userId]);

  const onSend = () => {
    if (msg.trim() === "") return;
    const tempId = nanoid();
    mutation.mutate({ message: msg, tempId });
    setMsg("");
  };

  useEffect(() => {
    updateMessagesAsRead(chatId, userId, supabase, {});
    setNewMessages((prev) =>
      prev.map((msg) =>
        msg.sender_id !== userId ? { ...msg, isRead: true } : msg
      )
    );
  }, [chatId, userId]);

  return (
    <div className="flex flex-col h-[46.5rem] bg-gray-50 border-l shadow-sm">
      <div className="flex items-center gap-4 px-6 pb-4 pt-6 border-b bg-white">
        <Avatar>
                <AvatarImage
                  src={userProfile?? ""}
                  width={56}
                  height={56}
                  alt="User Avatar"
                />
                <AvatarFallback>
                  {getAvatarFallback(userName)}
                </AvatarFallback>
              </Avatar>
        
        <h2 className="text-lg font-semibold text-orange-800">{userName}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse gap-4">
        {combinedMessages.length === 0 && <EmptyChat />}

        {combinedMessages.map((msg, index) => {
          const isSender = msg.sender_id === userId;
          const sentAt = msg.sent_at
            ? format(parseISO(msg.sent_at), "MMMM dd hh:mm a")
            : "---";
          const showSeen = isSender && msg.id === lastSeenMessageId;

          return (
            <div key={msg.id || msg.tempId || index} className="flex flex-col items-end gap-1">
              <div
                className={`max-w-[75%] p-3 rounded-xl shadow text-sm break-words ${isSender
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
                      className="underline"
                      onClick={() =>
                        mutation.mutate({ message: msg.message, tempId: msg.tempId! })
                      }
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
      </div>

      <div className="border-t bg-white px-4 py-3">
        <MessageInput msg={msg} setMsg={setMsg} onSend={onSend} />
      </div>
    </div>
  );
};

export default Conversation;
