import { getQueryClient } from "@/utils/app/get-query-client";
import { createClient } from "@/utils/supabase/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { TransactionList } from "./transaction-list";
import { fetchStudentSession } from "@/utils/app/fetch-student-session";
import { getStudentSessionViewCount } from "@/data/queries/student-session/get-student-session-view-count";

const LIMIT = 15;
export async function TransactionListServer() {
	const queryClient = getQueryClient();
	const supabase = await createClient();
	const page = 0;
	const search = "";
	const dateFilter = undefined;
	const dateFilterCol = undefined;
	const status = null;

	await queryClient.prefetchQuery({
		queryKey: [
			"admin_trns",
			search,
			status,
			dateFilter,
			dateFilterCol,
			page,
			LIMIT,
		],
		queryFn: async (): Promise<{
			data: TStudentSessionViewResult[];
			count: number;
		}> => {
			const [data, count] = await Promise.all([
				fetchStudentSession({
					search,
					page,
					limit: LIMIT,
					status,
					dateFilterCol: undefined,
					start: undefined,
					end: undefined,
					supabase,
				}),
				getStudentSessionViewCount(supabase, {
					search,
					status,
					dateFilterCol: null,
					start: undefined,
					end: undefined,
				}),
			]);
			if (!count) throw Error("count error");
			return { data: data, count };
		},
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<TransactionList />
		</HydrationBoundary>
	);
}
