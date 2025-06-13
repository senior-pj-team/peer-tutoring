type Params = {
	student_session_id: number;
	stripe_client_secrete: string;
};

export async function updateStripeClientSecrete(
	supabase: TSupabaseClient,
	{ student_session_id, stripe_client_secrete }: Params,
): Promise<boolean> {
	const { error } = await supabase
		.from("student_session")
		.update({ stripe_client_secrete })
		.eq("id", student_session_id);

	if (error) {
		console.log(
			"update stripe client in student session error: ",
			error.message,
		);
		return false;
	}
	return true;
}
