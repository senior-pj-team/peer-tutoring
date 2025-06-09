import { SupabaseClient } from "@supabase/supabase-js";
import type { Database as DB } from "./lib/database.types";

declare global {
	// Db and Supabase Client Type
	type Database = DB;
	type TSupabaseClient = SupabaseClient<DB>;
	type TSessionsMatViewResultRow =
		| Omit<DB["public"]["Views"]["session_tutor_mat_view"]["Row"], "tutor"> & {
			tutor: TTutor | null;
		};
	type TTutor = {
		tutor_id: string;
		name: string | null;
		tutor_rating: number | null;
	};

	// query result types
	type TSessionsMatViewResult =
		DB["public"]["CompositeTypes"]["session_tutor_mat_view_result"];

	type TStudentSessionResult =
		DB["public"]["Tables"]["student_session"]["Row"];

	type TRefundReportResult =
		DB["public"]["Tables"]["refund_report"]["Row"]
	
	type TTutorStatsViewResult = 
		DB["public"]["Views"]["tutor_stats_view"]["Row"];

	type TRatingReviewUserViewResult =
		DB["public"]["Views"]["rating_review_user_view"]["Row"];
	type TStudentSessionStatus = 
		DB["public"]["Enums"]["student_session_status"];
	type TTutorStats = 
		DB["public"]["Functions"]["get_tutor_stats"]["Returns"];
	type TChatList = 
		DB["public"]["Functions"]["get_chat_list"]["Returns"];
	type TMessage = 
		DB["public"]["Tables"]["message"]["Row"];

	// other global types
	type TBrowseSessionFilters = {
		search?: string;
		tutorRating?: number;
		tutorId?: string;
		sessionCategory?: string[];
		maxPrice?: number;
		minPrice?: number;
		free?: boolean;
		paid?: boolean;
		limit?: number;
		offset?: number;
		status?: DB["public"]["Enums"]["session_status"][];
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
	
	type TStudentSessionJoinResult = {
		session_id: number;
		student_id: string
		ss_status: TStudentSessionStatus;
		sessions: {
			image: string | null;
			session_name: string | null;
			course_code: string | null;
			course_name: string | null;
			start_time: string | null;
			end_time: string | null;
			tutor: {
				tutor_id: string | null;
				profile_url: string | null;
				username: string | null;
				tutor_rating: number | null;
			} | null;
		} | null;
	};

}
