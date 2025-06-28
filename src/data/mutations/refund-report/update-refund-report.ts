export async function updateRefundReport(
	supabase: TSupabaseClient,
    toUpdate: {[key: string]: any},
	{ss_id, id}: {ss_id?: number, id?: number}
): Promise<Boolean> {
	let query = supabase.from("refund_report").update(toUpdate);
	if(id) query = query.eq("id", id);
    if(ss_id) query= query.eq("ss_id", ss_id);
	const { error } = await query;

	if (error) {
		console.log("Error: ", error.message);
		return false;
	}
	return true;
}
