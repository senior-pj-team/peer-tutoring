import { addDays, format, parseISO, startOfDay } from "date-fns";

type Params = {
	status?: TStudentSessionStatus[] | null;
	search?: string;
	dateFilterCol?: "enrolled_at" | "refunded_at" | "paid_out_at" | null;
	start?: string;
	end?: string;
};

export const getStudentSessionViewCount = async (
	supabase: TSupabaseClient,
	{ status, search, dateFilterCol, start, end }: Params,
): Promise<number | null> => {
	let query = supabase
		.from("student_session_view")
		.select("student_session_id", { count: "exact" });

	if (status && status.length)
		query = query.in("student_session_status", status);

	if (search && search.trim().length) {
		const term = `%${search.trim()}%`;
		query = query.or(
			[
				`student_username.ilike.${term}`,
				`session_name.ilike.${term}`,
				`tutor_username.ilike.${term}`,
			].join(","),
		);
	}

	if (dateFilterCol && start && end) {
		query = query.gte(`${dateFilterCol}`, start).lt(`${dateFilterCol} `, end);
	}

	query = query.order("enrolled_at", { ascending: false });
	const { count, error } = await query;

	if (error) {
		console.log("Error count stundet_session info:", error.message);
		return null;
	}

	return count || 0;
};
