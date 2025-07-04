import { addDays, format, parseISO, startOfDay } from "date-fns";

type Params = {
	columns: string;
	student_session_id?: number;
	student_id?: string;
	session_id?: number;
	tutor_id?: string;
	status?: TStudentSessionStatus[] | null;
	search?: string;
	dateFilterCol?: "enrolled_at" | "refunded_at" | "paid_out_at" | null;
	start?: string;
	end?: string;
	offset?: number;
	limit?: number;
};

export const getStudentSessionView = async (
	supabase: TSupabaseClient,
	{
		columns,
		student_session_id,
		student_id,
		session_id,
		tutor_id,
		status,
		search,
		dateFilterCol,
		start,
		end,
		offset,
		limit,
	}: Params,
): Promise<TStudentSessionViewResult[] | null> => {
	let query = supabase.from("student_session_view").select(columns);

	if (student_id) query = query.eq("student_id", student_id);
	if (student_session_id)
		query = query.eq("student_session_id", student_session_id);
	if (session_id) query = query.eq("session_id", session_id);
	if (status && status.length)
		query = query.in("student_session_status", status);
	if (tutor_id) query = query.eq("tutor_id", tutor_id);

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

	if (typeof offset === "number" && typeof limit === "number") {
		query = query.range(offset, offset + limit - 1);
	}

	query = query.order("enrolled_at", { ascending: false });

	const { data, error } = await query;

	if (error) {
		console.log("Error fetching student session view:", error.message);
		return null;
	}

	return (data as unknown as TStudentSessionViewResult[]) ?? null;
};
