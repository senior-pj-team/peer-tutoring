"use client";

import { useEffect } from "react";

export function useChatRealtime(
  supabase: TSupabaseClient,
  userId: string,
  onChatListUpdate: (chatRow: any) => void
) {
  console.log("Hook called");
  useEffect(() => {
  if (!userId) return; // Wait for valid userId
  const channel = supabase
    .channel("realtime-chat")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "chat",
      },
      (payload) => {
        type ChatRow = { one_to_one_key?: string } & { [key: string]: any };
        console.log("hook ChatRow: ", payload.new);
        const chat = payload.new as ChatRow;

        if (chat?.one_to_one_key?.split(":").includes(userId)) {
          console.log("Realtime chat update:", payload);
          onChatListUpdate(chat);
        }
      }
    )
    .subscribe();

  console.log("Use effect run");

  return () => {
    supabase.removeChannel(channel);
  };
}, [supabase, userId, onChatListUpdate]);
}
