import { useEffect } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";

export function useChatListRealtime(
  supabase: TSupabaseClient,
  userId: string,
  reload: () => void
) {
  useEffect(() => {
    const channel: RealtimeChannel = supabase
      .channel("realtime-chatlist")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat",
        },
        (payload) => {
          console.log("inserted payload: ", payload);
          reload();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "chat",
        },
        (payload) => {
          console.log(" uploaded payload: ", payload);
          reload();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId, reload]);
}
