export async function insertRefundReport(
	supabase: TSupabaseClient,
	ss_id: number,
	reason: string,
	description: string,
	type: TRefund,
): Promise<Boolean> {
	const { error } = await supabase.from("refund_report").insert({
		ss_id,
		reason,
		description,
		type,
	});

	if (error) {
		console.log("Error: ", error.message);
		return false;
	}
	return true;
}
