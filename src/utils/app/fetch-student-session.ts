import { getStudentSessionView } from "@/data/queries/student-session/get-student-session-view";

export const fetchStudentSession = async ({
	columns = "*",
	pageParam = 0,
	page,
	search,
	status,
	dateFilterCol,
	start,
	end,
	student_id,
	tutor_id,
	supabase,
	limit,
}: {
	columns?: string;
	pageParam?: number;
	search?: string;
	page?: number;
	status?: TStudentSessionStatus[] | null;
	dateFilterCol?: "enrolled_at" | "refunded_at" | "paid_out_at" | null;
	start?: string;
	end?: string;
	student_id?: string;
	tutor_id?: string;
	supabase: TSupabaseClient;
	limit?: number;
}) => {
	if (page) {
		pageParam = page * (limit ?? 0);
	}
	const data = await getStudentSessionView(supabase, {
		columns,
		student_id,
		tutor_id,
		offset: pageParam,
		limit: limit ?? 0,
		search,
		status: status ?? null,
		dateFilterCol,
		start,
		end,
	});
	if (!data) throw new Error("Server error");
	return data;
};
