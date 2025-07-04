import { SessionServer } from "@/components/app/features/admin/sessions/session-server";
import GeneralLoading from "@/components/app/shared/general-loading";
import { Suspense } from "react";

export default async function page({
	params,
}: {
	params: Promise<{
		session_id: string;
	}>;
}) {
	const { session_id } = await params;

	return (
		<Suspense fallback={<GeneralLoading />}>
			<SessionServer session_id={session_id} />
		</Suspense>
	);
}
