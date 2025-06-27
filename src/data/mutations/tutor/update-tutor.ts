type Params = {
	bio_highlight: string | null | undefined;
	biography: string | null | undefined;
	user_id: string;
};

export async function updateTutor(
	supabase: TSupabaseClient,
	{ bio_highlight, biography, user_id }: Params,
): Promise<boolean> {
	const { error } = await supabase
		.from("user")
		.update({
			bio_highlight,
			biography,
		})
		.eq("id", user_id);
	if (error) {
		console.log("Error in updating tutor: ", error.message);
		return false;
	}
	return true;
}
