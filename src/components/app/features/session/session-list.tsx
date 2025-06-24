import React from "react";
import GeneralSessionCard from "../../shared/sessions/general-session-card";
import { getSessionsMatView } from "@/data/queries/sessions/get-sessions-mat-view";

const SessionList = async ({
	tutor_id,
	supabase,
}: {
	tutor_id: string;
	supabase: TSupabaseClient;
}) => {
	const sessions = await getSessionsMatView(supabase, {
		tutorId: tutor_id,
		offset: 0,
		limit: 4,
	});
	if (!sessions || !sessions.rows) return <></>;

	return (
		<>
			{sessions.rows.map((session) => (
				<GeneralSessionCard
					key={session.session_id}
					className="rounded-none"
					content={session}
					type={""}
				/>
			))}
		</>
	);
};

export default SessionList;
