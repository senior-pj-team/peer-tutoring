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
		email: string;
		tutor_rating: number | null;
	};

	type TSessionsMatViewResultRow =
		| Omit<DB["public"]["Views"]["session_tutor_mat_view"]["Row"], "tutor"> & {
			tutor: TTutor | null;
		};

	// query result types
	type TSessionsResult = DB["public"]["Tables"]["sessions"]["Row"];
	type TSelectSessionsMatViewResult =
		DB["public"]["CompositeTypes"]["session_tutor_mat_view_result"];

	type TStudentSessionResult = DB["public"]["Tables"]["student_session"]["Row"];

	type TRefundReportResult = DB["public"]["Tables"]["refund_report"]["Row"];
	type TRatingReviewUserViewResult =
		DB["public"]["Views"]["rating_review_user_view"]["Row"];
	type TStudentSessionStatus = DB["public"]["Enums"]["student_session_status"];
	type TTutorStats = DB["public"]["Functions"]["get_tutor_stats"]["Returns"];
	type TChatList = DB["public"]["Functions"]["get_chat_list"]["Returns"];
	type TMessage = DB["public"]["Tables"]["message"]["Row"];
	type TUser = DB["public"]["Tables"]["user"]["Row"];
	type TOtherUser = DB["public"]["Functions"]["get_other_participant"]["Returns"];

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
	type TNotificationResult = DB["public"]["Tables"]["notification"]["Row"];
	type TUserResult = DB["public"]["Tables"]["user"]["Row"];

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
		| { success: true; data?: T }
		| { success: false; error: { message: string } };

	type TRatingStat = {
		rating: number;
		count: number;
	};
	type TRatingStat = {
		rating: number;
		count: number;
	};
	type TChat = {
		chat_uuid: string;
		chat_name: string;
		chat_profile_url: string;
		last_message: string;
		last_sent_at: string;
	}
	type TStudentSessionWithSessionName = TStudentSessionResult & {
  	session: {
    	session_name: string;
  		};
	};

	//Enums
	type TStudentSessionStatus = DB["public"]["Enums"]["student_session_status"];
	type TSessionStatus = DB["public"]["Enums"]["session_status"];
	type TNotificationStatus = DB["public"]["Enums"]["notification_status"];
	type TNotificationType = DB["public"]["Enums"]["notification_type"];
}
