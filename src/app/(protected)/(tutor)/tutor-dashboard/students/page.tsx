import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/app/get-query-client";
import { createClient } from "@/utils/supabase/server";
import { fetchStudentSession } from "@/utils/app/fetch-student-session";
import { getStudentSessionViewCount } from "@/data/queries/student-session/get-student-session-view-count";
import { getUserSession } from "@/utils/get-user-session";
import TutorStudentList from "@/components/app/features/tutor/tutor-dashboard/tutor-student-list";
import { DateRange } from "react-day-picker";
import { subDays } from "date-fns";

export default async function page() {

	const user= await getUserSession();

	const queryClient = getQueryClient();
	const supabase = await createClient();
	const page = 0;
	const LIMIT= 15;
	const search = "";
	const today= new Date();
	const dateFilter: DateRange = {
		from: subDays(today, 30),
		to: today,
	  };
	const dateFilterCol = "enrolled_at";
	const status: TStudentSessionStatus[] = ["enrolled", "paid", "refunded", "completed"];

	await queryClient.prefetchQuery({
		queryKey: [
			"tutor_students",
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
					supabase,
					tutor_id: user?.user_id
				}),
				getStudentSessionViewCount(supabase, {
					search,
					status,
					dateFilterCol: null,
					tutor_id: user?.user_id
				}),
			]);
			if (!count) throw Error("count error");
			return { data: data, count };
		},
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<TutorStudentList tutor_id={user?.user_id}/>
		</HydrationBoundary>
	);
}
