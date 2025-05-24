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

	type TStudentSessionStatus =
		| "completed"
		| "enrolled"
		| "pending_refund"
		| "refunded"
		| "paid"
		| null;
}
