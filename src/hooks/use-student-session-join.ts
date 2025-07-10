import { getStudentSessionViewCount } from "@/data/queries/student-session/get-student-session-view-count";
import { fetchStudentSession } from "@/utils/app/fetch-student-session";
import { getDateRange } from "@/utils/app/get-date-range";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";

export function useStudentSessionJoin(
	columns: string,
	user_id: string,
	enabled: boolean,
	supabase: TSupabaseClient,
) {
	return useQuery({
		queryKey: ["nav_bar_mySessions", user_id],
		queryFn: () =>
			fetchStudentSession({
				columns,
				pageParam: 0,
				student_id: user_id,
				supabase,
				limit: 3,
				status: ["enrolled", "completed", "paid"],
			}),
		staleTime: 1000 * 60 * 60,
		enabled,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
}

export function useStudentSessionViewWithCount({
	key,
	supabase,
	page,
	limit,
	columns = "*",
	search,
	status,
	dateFilterCol,
	dateFilter,
	student_id,
	tutor_id
}: {
	key: string;
	supabase: TSupabaseClient;
	page: number;
	limit: number;
	columns?: string;
	search?: string;
	status?: TStudentSessionStatus[] | null;
	dateFilterCol?: "enrolled_at" | "refunded_at" | "paid_out_at" | null;
	dateFilter?: DateRange | undefined;
	student_id?: string;
	tutor_id?: string;
}) {
	const datesAreValid =
		(!dateFilterCol && dateFilter) || (dateFilterCol && !dateFilter)
			? false
			: true;
	let dateRange: {
		start_date: string | undefined;
		end_date: string | undefined;
	} = {
		start_date: undefined,
		end_date: undefined,
	};
	if (dateFilter && dateFilter.from && dateFilter.to) {
		dateRange = getDateRange(dateFilter);
	}
	console.log("Hook called", datesAreValid);
	return useQuery({
		queryKey: [key, search, status, dateFilter, dateFilterCol, page, limit],
		queryFn: async (): Promise<{
			data: TStudentSessionViewResult[];
			count: number;
		}> => {
			const [data, count] = await Promise.all([
				fetchStudentSession({
					columns,
					search,
					page,
					limit,
					status,
					dateFilterCol,
					start: dateRange.start_date,
					end: dateRange.end_date,
					student_id,
					tutor_id,
					supabase,
				}),
				getStudentSessionViewCount(supabase, {
					search,
					status,
					dateFilterCol,
					start: dateRange.start_date,
					end: dateRange.start_date,
					student_id,
					tutor_id,
				}),
			]);
			if (count === undefined || count === null) {
				console.log({data, count}, "@@");
				throw Error("count error")
			};
			console.log({data, count}, "@@");
			return { data, count };
		},
		enabled: datesAreValid,
		placeholderData: keepPreviousData,
	});
}
