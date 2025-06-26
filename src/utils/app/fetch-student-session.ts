import { getStudentSessionJoin } from "@/data/queries/student-session/get-student-session-join";

export const LIMIT = 8;
export const fetchStudentSession = async ({
  pageParam = 0,
  student_id,
  supabase
}: {
  pageParam: number;
  student_id: string;
  supabase: TSupabaseClient;
}) => {
  const data = await getStudentSessionJoin(supabase, {
    student_id,
    offset: pageParam,
    limit: LIMIT,
    status: ['completed','enrolled','paid']
  })
  if (!data) throw new Error("Server error");
  return data;
}