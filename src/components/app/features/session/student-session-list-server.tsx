import { createClient } from "@/utils/supabase/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { fetchStudentSession } from "@/utils/app/fetch-student-session";
import StudentSessionList from "./student-session-list";
import { getStudentSessionViewCount } from "@/data/queries/student-session/get-student-session-view-count";

export default async function StudentSessionListServer({
	student_id,
}: {
	student_id: string;
}) {
	const queryClient = new QueryClient();
	const supabase = await createClient();

	await queryClient.prefetchQuery({
		queryKey: [
			"student_sessions",
			undefined,
			undefined,
			undefined,
			undefined,
			0,
			8,
		],
		queryFn: async (): Promise<{
			data: TStudentSessionViewResult[];
			count: number;
		}> => {
			const [data, count] = await Promise.all([
				fetchStudentSession({
					columns: "*",
					page: 0,
					limit: 8,
					student_id,
					supabase,
				}),
				getStudentSessionViewCount(supabase, {
					student_id,
				}),
			]);
			if (!count && count !== 0) throw Error("count error");
			return { data, count };
		},
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<StudentSessionList student_id={student_id} />
		</HydrationBoundary>
	);
}
