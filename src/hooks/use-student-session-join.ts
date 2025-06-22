import { getStudentSessionJoin } from "@/data/queries/student-session/get-student-session-join";
import { useQuery } from "@tanstack/react-query";

export function useStudentSessionJoin(
  user_id: string,
  enabled: boolean,
  supabase: TSupabaseClient
) {
  console.log("called: ", user_id);
  return useQuery({
    queryKey: ["nav_bar_mySessions", user_id],
    queryFn: () =>
      fetchMySession({
        user_id,
        supabase,
      }),
    staleTime: 1000 * 60 * 60,
    enabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}

async function fetchMySession({
  user_id,
  supabase,
}: {
  user_id: string;
  supabase: TSupabaseClient;
}) {
  const student_sessions = await getStudentSessionJoin(supabase, {
        student_id:user_id,
        status: ["enrolled"],
    });
  if (!student_sessions) throw new Error("Error fetching data");
  return student_sessions;
}
