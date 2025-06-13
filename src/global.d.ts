import { SupabaseClient } from "@supabase/supabase-js";
import type { Database as DB } from "./lib/database.types";

declare global {
	// Db and Supabase Client Type
	type Database = DB;
	type TSupabaseClient = SupabaseClient<DB>;

	type TTutor = {
		tutor_id: string;
		name: string | null;
		email: string;
		tutor_rating: number | null;
	};

	type TSessionsMatViewResultRow =
		| Omit<DB["public"]["Views"]["session_tutor_mat_view"]["Row"], "tutor"> & {
				tutor: TTutor | null;
		  };

	// query result types
	type TSelectSessionsMatViewResult =
		DB["public"]["CompositeTypes"]["session_tutor_mat_view_result"];

	type TSessionsResult = DB["public"]["Tables"]["sessions"]["Row"];

	type TStudentSessionResult = DB["public"]["Tables"]["student_session"]["Row"];

	type TStudentSessionViewCardResult = Pick<
		TStudentSessionViewResult,
		"session_id",
		"image",
		"session_name",
		"course_code",
		"course_name",
		"start_time",
		"end_time",
		"tutor_name",
		"tutor_rating",
		"ss"
	>;

	type TTutorStatsViewResult = DB["public"]["Views"]["tutor_stats_view"]["Row"];

	type TRatingReviewUserViewResult =
		DB["public"]["Views"]["rating_review_user_view"]["Row"];

	type TStudentSessionJoinResult = {
		id: number;
		session_id: number;
		student_id: string;
		amount_from_student?: number | null;
		stripe_client_secrete: string;
		ss_status: TStudentSessionStatus;
		sessions: {
			image: string | null;
			session_name: string | null;
			course_code: string | null;
			course_name: string | null;
			max_students: number | null;
			start_time: string | null;
			end_time: string | null;
			tutor: {
				id: string | null;
				profile_url: string | null;
				username: string | null;
				tutor_rating: number | null;
			} | null;
		} | null;
	};

	// other global types
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

	//Enums
	type TStudentSessionStatus = DB["public"]["Enums"]["student_session_status"];
	type TSessionStatus = DB["public"]["Enums"]["session_status"];
}
