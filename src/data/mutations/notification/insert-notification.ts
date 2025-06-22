export async function insertNotification(
  supabase: TSupabaseClient,
  title: string,
  body: string,
  user_id: string,
  type: TNotification
): Promise<Boolean> {
  const { error } = await supabase.from("notification").insert({
    title,
    body,
    user_id,
    type,
  });
  if (error) {
    console.log("Error: ", error.message);
    return false;
  }
  return true;
}
