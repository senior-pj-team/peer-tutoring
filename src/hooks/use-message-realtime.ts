"use client";

import { useEffect } from "react";

export function useMessageRealtime(
	supabase: TSupabaseClient,
	chatId: string,
	onInsert: (message: TMessage) => void,
	onUpdate: (message: TMessage) => void,
) {
	useEffect(() => {
		const channel = supabase
			.channel(`realtime-messages-${chatId}`)
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "message",
					filter: `chat_id=eq.${chatId}`,
				},
				(payload) => {
					const newMsg = payload.new as TMessage;
					onInsert(newMsg);
				},
			)
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "message",
					filter: `chat_id=eq.${chatId}`,
				},
				(payload) => {
					const updatedMsg = payload.new as TMessage;
					onUpdate(updatedMsg);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [chatId, supabase, onInsert, onUpdate]);
}
