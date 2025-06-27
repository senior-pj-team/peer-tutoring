type Params = {
	ss_id?: number;
};

export const getRefundReport = async (
	supabase: TSupabaseClient,
	{ ss_id}: Params,
): Promise<TRefundReportResult[] | null> => {
	let query = supabase.from("refund_report").select("*");

	if (ss_id) query = query.eq("ss_id", ss_id);

	const { data, error } = await query.order("created_at", { ascending: false });
	console.log("data: ", data);
	if (error) {
		console.error("Error fetching refund report:", error);
		return null;
	}

	return data as TRefundReportResult[] | null;
};
