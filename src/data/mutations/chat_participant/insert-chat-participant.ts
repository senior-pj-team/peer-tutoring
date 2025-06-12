export async function insertChatParticipants(
  chatId: string,
  participantIds: string[],
  supabase: TSupabaseClient
): Promise<boolean | null> {
  const insertData = participantIds.map((participantId) => ({
    chat_id: chatId,
    participant_id: participantId,
  }));

  const { error } = await supabase
    .from("chat_participant")
    .insert(insertData);

  if (error) {
    console.log("error inserting chat participants:", error);
    return null;
  }
  return true;
}
