import { SupabaseClient } from "@supabase/supabase-js";
import type { Database as DB } from "./lib/database.types";

declare global {
	// Db and Supabase Client Type
	type Database = DB;
	type TSupabaseClient = SupabaseClient<DB>;
	type TSessionsMatViewResultRow = Omit<
		DB["public"]["Views"]["session_tutor_mat_view"]["Row"],
		"tutor"
	> & {
		tutor: TTutor | null;
	};
	type TTutor = {
		tutor_id: string;
		name: string | null;
		tutor_profile: string | null;
		school: string | null;
		major: string | null;
		email: string;
		tutor_rating: number | null;
	};

	type TSessionsMatViewResultRow = Omit<
		DB["public"]["Views"]["session_tutor_mat_view"]["Row"],
		"tutor"
	> & {
		tutor: TTutor | null;
	};

	// query result types
	type TSessionsResult = DB["public"]["Tables"]["sessions"]["Row"];
	type TTutorWithStatsResult =
		DB["public"]["Functions"]["get_tutors_with_stats"]["Returns"];

	type TSelectSessionsMatViewResult =
		DB["public"]["Functions"]["select_session_tutor_mat_view"]["Returns"];
	type TStudentSessionResult = DB["public"]["Tables"]["student_session"]["Row"];
	type TRefundReportResult = DB["public"]["Tables"]["refund_report"]["Row"];
	type TRatingReviewUserViewResult =
		DB["public"]["Views"]["rating_and_review_view"]["Row"];
	type TChatList = DB["public"]["Functions"]["get_chat_list"]["Returns"];
	type TMessage = DB["public"]["Tables"]["message"]["Row"];
	type TMessageWithStatus = TMessage & { status: string };
	type TUser = DB["public"]["Tables"]["user"]["Row"];
	type TOtherUser =
		DB["public"]["Functions"]["get_other_participant"]["Returns"];
	type TAmountByStatuses =
		DB["public"]["Functions"]["sum_tutor_amounts_by_status"]["Returns"];

	type TStudentSessionJoinResult = TStudentSessionResult & {
		student: TUser;
	} & {
		sessions: TSessionsResult & {
			tutor: TUser;
		};
	};

	type TRefundReportJoinResult = {
		id: number;
		reason: string | null;
		description: string | null;
		status: TRefundStatus | null;
		type: TRefundType | null;
		created_at: string;
		ss_id: number;
		receipt: string | null;
		processed_at: string | null;
		student_session: {
			id: number;
			student_id: string;
			ss_status: TStudentSessionStatus;
			refunded_amount: number | null;
			student: {
				id: string | null;
				profile_url: string | null;
				username: string | null;
				tutor_rating: number | null;
				email: string | null;
			};
			session: {
				id: number;
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
					email: string | null;
				} | null;
			};
		};
	} | null;

	type;

	type TBankInfoJoinTutorResult = TBankInfoResult & {
		user: TUser;
	};

	type TSessionJoinResult = {
		id: number;
		session_name: string;
		price: number;
		service_fee: number | null;
		end_time: string;
		held_until: string | null;
		paid_out_at: string | null;
		payment_evidence: string | null;
		tutor: {
			id: string;
			profile_url: string | null;
			username: string | null;
			email: string;
		};
	};

	type TNotificationResult = DB["public"]["Tables"]["notification"]["Row"];
	type TBankInfoResult = DB["public"]["Tables"]["bank_info"]["Row"];
	type TTutorSessionStats =
		DB["public"]["Functions"]["get_tutor_session_stats"]["Returns"];
	type TTutorMonthlyPaidSum =
		DB["public"]["Functions"]["get_monthly_tutor_amounts_paid"]["Returns"];

	type TStudentSessionViewResult =
		DB["public"]["Views"]["student_session_view"]["Row"];
	type TAmountSummaries =
		DB["public"]["Functions"]["get_amount_summaries"]["Returns"];
	type TSumAmountToTutor = {
		session_id: number;
		sum: number;
	}[];
	type TMonthlyProfits =
		DB["public"]["Functions"]["get_monthly_profits"]["Returns"];

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
		profile_url: string | null;
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
	};
	type TStudentSessionWithSessionName = TStudentSessionResult & {
		session: {
			session_name: string;
		};
	};

	type TStudentSessionJoinByIdResult = TStudentSessionResult & {
		sessions: Omit<TSessionsResult, "tutor"> & {
			tutor: TTutor | null;
		};
	};

	//Enums
	type TStudentSessionStatus = DB["public"]["Enums"]["student_session_status"];
	type TSessionStatus = DB["public"]["Enums"]["session_status"];
	type TNotificationStatus = DB["public"]["Enums"]["notification_status"];
	type TNotificationType = DB["public"]["Enums"]["notification_type"];
	type TRefundType = DB["public"]["Enums"]["refund_type"];
	type TRefundStatus = DB["public"]["Enums"]["refund_status"];
	type TBankAccountType = DB["public"]["Enums"]["bank_account_type"];
	type TNotification = DB["public"]["Enums"]["notification_type"];
	type TRefund = DB["public"]["Enums"]["refund_type"];
	type TTutorStatus = DB["public"]["Enums"]["tutor_status"];
	type TAppRole = DB["public"]["Enums"]["app_role"];
}
