"use client";

import { useEffect } from "react";

export function useMessageRealtime(supabase: TSupabaseClient, chatId: string, onNewMessage: (message: any) => void) {
  useEffect(() => {
    const channel = supabase
      .channel("realtime-messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          console.log("New message:", payload.new);
          onNewMessage(payload.new as TMessage);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, onNewMessage]);
}
