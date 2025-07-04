type Params = {
	student_session_id?: number;
	student_id?: string;
	session_id?: number;
	tutor_id?: string;
	status?: TStudentSessionStatus[] | null;
	search?: string;
	dateFilterCol?: "created_at" | "refunded_at" | "paid_out_at" | null;
	dateFilter?: string;
	offset?: number;
	limit?: number;
};

export const getStudentSessionJoin = async (
	supabase: TSupabaseClient,
	{
		student_session_id,
		student_id,
		session_id,
		tutor_id,
		status,
		search,
		dateFilterCol,
		dateFilter,
		offset,
		limit,
	}: Params,
): Promise<TStudentSessionJoinResult[] | null> => {
	let query = supabase.from("student_session").select(
		`
		*,
      student:user!student_id!inner(
       *
      ),
      sessions!session_id!inner(
        *,
        tutor:user!tutor_id!inner(
          *
        )
      )
    `,
	);

	if (student_id) query = query.eq("student_id", student_id);
	if (student_session_id) query = query.eq("id", student_session_id);
	if (session_id) query = query.eq("session_id", session_id);
	if (status && status.length) query = query.in("status", status);
	if (tutor_id) query = query.eq("sessions.tutor.id", tutor_id);

	if (search && search.trim().length) {
		const term = `%${search.trim()}%`;
		query = query.or(
			[
				`student.username.ilike.${term}`,
				`sessions.session_name.ilike.${term}`,
				`sessions.tutor.username.ilike.${term}`,
			].join(","),
		);
	}

	if (dateFilterCol && dateFilter) {
		query = query.eq(`sessions.${dateFilterCol}`, dateFilter);
	}

	if (typeof offset === "number" && typeof limit === "number") {
		query = query.range(offset, offset + limit - 1);
	}

	query = query.order("created_at", { ascending: false });

	const { data, error } = await query;

	if (error) {
		console.log("Error fetching session info:", error.message);
		return null;
	}

	return (data as unknown as TStudentSessionJoinResult[]) ?? null;
};
