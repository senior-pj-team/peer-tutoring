import { SessionSchemaT } from "@/schema/session-schema";
export const updateSession = async (
    sessionId: number,
    values: SessionSchemaT,
    uploadedUrl: string | null,
    start: Date,
    end: Date,
    tutor_id: string,
    supabase: TSupabaseClient
) => {
    if (!sessionId) {
        return {
            data: null,
            error: { message: "Missing session ID" },
        };
    }
    return await supabase
        .from("sessions")
        .update({
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
            category_id: Number(values.category),
            paid_session: values.paid,
            price: values.paid ? values.amount : 0,
            tutor_id: tutor_id,
        })
        .eq("id", sessionId);
};