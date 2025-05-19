import { SupabaseClient } from "@supabase/supabase-js";
import { SessionSchemaT } from "@/schema/sessionSchema";

export const insertSession = async (
  supabase: SupabaseClient,
  values: SessionSchemaT,
  uploadedUrl: string | null,
  start: Date,
  end: Date,
  tutor_id: String
) => {
  return await supabase.from("sessions").insert({
    session_name: values.sessionName,
    course_code: values.courseCode,
    course_name: values.courseName,
    school: values.school,
    major: values.major,
    image: uploadedUrl,
    description: values.description,
    requirement: values.requirements,
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    max_students: values.maxStudents,
    location: values.location,
    category_id: values.category,
    isPaid: values.paid,
    price: values.paid ? values.amount : 0,
    status: "open",
    tutor_id: tutor_id,
  });
};
