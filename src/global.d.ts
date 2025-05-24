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
}
