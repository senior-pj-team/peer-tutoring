import { SupabaseClient } from "@supabase/supabase-js";
import type { Database as DB } from "./lib/database.types";

declare global {
  // Db and Supabase Client Type
  type Database = DB;
  type TSupabaseClient = SupabaseClient<DB>;
  type TTutor = {
    tutor_id: string;
    name: string | null;
    tutor_rating: number | null;
  };

  // query result types
  type TSessionsMatViewResult = Omit<
    DB["public"]["Views"]["session_tutor_mat_view"]["Row"],
    "tutor"
  > & {
    tutor: TTutor | null;
  };

  type TStudentSessionViewResult =
    DB["public"]["Views"]["student_session_view"]["Row"];

  type TStudentSessionViewCardResult = Pick<
    TStudentSessionViewResult,
    "session_id",
    "image",
    "session_name",
    "course_code",
    "course_name",
    "start_time",
    "end_time",
    "tutor",
    "ss"
  >;

  type TStudentSessionViewDetailResult = TStudentSessionViewResult & {
    enrolled_students: number;
  };

  type TTutorStatsViewResult = DB["public"]["Views"]["tutor_stats_view"]["Row"];

  type TRatingReviewUserViewResult =
    DB["public"]["Views"]["rating_review_user_view"]["Row"];

  // other global types
  type TBrowseSessionFilters = {
    search?: string;
    tutorRating?: number;
    sessionCategory?: string;
    maxPrice?: number;
    minPrice?: number;
    free?: boolean;
    paid?: boolean;
    limit?: number;
    offset?: number;
    tutor_id?: string;
  };

  type MyJwtPayload = {
    email: string;
    app_user_id: string;
    user_metadata: {
      full_name: string;
    };
    profile_image: string;
    user_role: string;
    [key: string]: any;
  };

  type UserSession = {
    email: string;
    full_name: string;
    profile_url: string;
    user_role: string;
    user_id: string;
  };

  type ActionResponseType<T> =
    | { success: true; data: T }
    | { success: false; error: { message: string } };

  type TRatingStat = {
    rating: number;
    count: number;
  };

  type TSessionHeaderData = {
    image: string | null;
    session_name: string | null;
    course_code: string | null;
    course_name: string | null;
    school: string | null;
    major: string | null;
    tutor_name: string | null;
    tutor_rating: number | null;
    session_status: string | null;
  };
  type TSessionContentData = {
    description: string | null;
    requirement: stringt | null;
    location: string | null;
    date: string | null;
    start_time: string | null;
    end_time: string | null;
    max_students: number | null;
    enrolled_students: number;
  };
  type TSessionPaymentData = {
    amount_from_student: number | null;
    enrolled_at: string | null;
    refunded_amount: number | null;
    refunded_at: string | null;
    session_name: string | null;
  };
}
