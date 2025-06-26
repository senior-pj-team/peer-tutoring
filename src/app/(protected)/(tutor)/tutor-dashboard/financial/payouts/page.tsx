import { DataTable } from "@/components/app/shared/data-table";
import { columns } from "./columns";
import { samplePayouts } from "./data";
import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import GeneralError from "@/components/app/shared/error";
import { getStudentSessionJoin } from "@/data/queries/student-session/get-student-session-join";

export default async function Payouts() {
	const supabase = await createClient();
	const user = await getUserSession();
	
	if (!user || !supabase) return <GeneralError />;
	
	const student_sessions = await getStudentSessionJoin(supabase, {
		tutor_id: user.user_id,
		status: ['paid']
	});
	
	if (!student_sessions) return <GeneralError />;
	
	return (
		<div className="container mx-auto px-4 lg:px-6">
			<DataTable columns={columns} data={student_sessions} type="payouts" />
		</div>
	);
}
