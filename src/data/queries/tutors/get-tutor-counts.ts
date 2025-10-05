import { createClient } from "@/utils/supabase/server";

export async function getTutorCounts() {
	const supabase = await createClient();
	const { data, error } = await supabase.rpc("get_tutor_counts");

	if (error) {
		console.error("Error fetching tutor counts:", error.message);
		return null;
	}
	return data;
}
