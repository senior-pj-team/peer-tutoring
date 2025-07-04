import { getSumAmountToTutor } from "@/data/queries/student-session/get-sum-amount-to-tutor";
import { useQuery } from "@tanstack/react-query";

export function useSumAmountToTutorQuery(
	supabase: TSupabaseClient,
	session_id: number,
	enabled: boolean,
) {
	return useQuery({
		queryKey: ["amount_to_tutor", session_id],
		queryFn: async () => {
			const result = await getSumAmountToTutor(supabase, session_id);
			if (!result || result.length < 1)
				throw Error(`Error fetching amount to tutor for: ${session_id}`);
			return result;
		},
		enabled,
	});
}
