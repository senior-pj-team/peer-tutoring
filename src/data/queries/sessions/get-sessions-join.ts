type Params = {
	order_by?: string;
	dateFilterCol?: string;
	status?: TSessionStatus[];
	start?: string;
	end?: string;
	offset?: number;
	limit?: number;
};

export async function getSessionsJoin(
	supabase: TSupabaseClient,
	{ order_by, status, dateFilterCol, start, end, offset, limit }: Params,
): Promise<TSessionJoinResult[] | null> {
	let query = supabase.from("sessions").select(
		`
        id,
		session_name,
		price,
		service_fee,
		end_time,
		held_until,
		paid_out_at,
		payment_evidence,
		tutor:user!tutor_id!inner(
			id,
			profile_url,
			username,
			email
		)
        `,
	);

	if (status) query = query.in("status", status);
	if (dateFilterCol && start && end) {
		query = query.gte(`${dateFilterCol}`, start).lt(`${dateFilterCol} `, end);
	}

	if (typeof offset === "number" && typeof limit === "number") {
		query = query.range(offset, offset + limit - 1);
	}

	if (order_by) query = query.order(order_by, { ascending: false });

	const { data, error } = await query;

	if (error) {
		console.log("Error fetching sessions join:", error.message);
		return null;
	}

	return data as TSessionJoinResult[];
}
