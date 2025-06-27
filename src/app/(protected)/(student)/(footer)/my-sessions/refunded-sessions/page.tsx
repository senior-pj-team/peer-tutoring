import SessionCard from "@/components/app/shared/sessions/session-card";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";
import GeneralError from "@/components/app/shared/error";
import { getRefundReportJoin } from "@/data/queries/refund-and-report/get-refund-report-join";

const page = async () => {
	const user = await getUserSession();
	if (!user) return <GeneralError />;
	const supabase = await createClient();
	const data = await getRefundReportJoin(supabase, {
		student_id: user.user_id,
	});
	if (!data) return <GeneralError />;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{data.length > 0 ? (
				data.map((ss) => (
					<SessionCard key={ss?.id} refund_report={ss} page="refund" />
				))
			) : (
				<div className="col-span-full text-center text-gray-500">
					No refunded sessions found 👽
				</div>
			)}
		</div>
	);
};

export default page;
