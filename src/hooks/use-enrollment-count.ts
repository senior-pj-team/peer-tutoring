import { getEnrollmentCount } from "@/data/queries/student-session/get-enrollment-count";
import { useQuery } from "@tanstack/react-query";

export function useEnrollmentCount(
	session_id: number,
	supabase: TSupabaseClient,
	ss_status: TStudentSessionStatus[],
	enabled: boolean,
) {
	return useQuery({
		queryKey: ["session_enrollment_counts", session_id, ss_status],
		queryFn: () => fetchCounts(session_id, supabase, ss_status),
		enabled,
	});
}

async function fetchCounts(
	session_id: number,
	supabase: TSupabaseClient,
	ss_status: TStudentSessionStatus[],
) {
	const counts_result = getEnrollmentCount(supabase, {
		session_id,
		ss_status: ss_status,
	});

	if (!counts_result && counts_result !== 0) throw new Error("Error fetching");

	return counts_result;
}
