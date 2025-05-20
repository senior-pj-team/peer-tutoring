import { createClient } from "@/utils/supabase/server"; // your supabase client helper

export const getUserId = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("User not authenticated");
  }

  return user.id;
};
