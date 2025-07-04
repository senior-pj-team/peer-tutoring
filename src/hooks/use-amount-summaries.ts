import { getamountSummaries } from "@/data/queries/student-session/get-amount-summaries";
import { useQuery } from "@tanstack/react-query";

export function UseAmountSummariesQuery({
	supabase,
	start,
	end,
}: {
	supabase: TSupabaseClient;
	start: string | undefined;
	end: string | undefined;
}) {
	return useQuery({
		queryKey: ["amount_summaries", start, end],
		queryFn: async () => {
			const result = await getamountSummaries(supabase, {
				start_date: start,
				end_date: end,
			});
			if (!result || result.length < 1)
				throw Error("Amount Summaries query error");
			return result;
		},
	});
}
