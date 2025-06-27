export async function getTutorSessionStats(
	supabase: TSupabaseClient,
	tutor_id: string,
): Promise<TTutorSessionStats | null> {
	const { data, error } = await supabase.rpc("get_tutor_session_stats", {
		p_tutor_id: tutor_id,
	});

	if (error) {
		console.log("Error in get tutor session stats: ", error);
		return null;
	}

	return data as TTutorSessionStats;
}
