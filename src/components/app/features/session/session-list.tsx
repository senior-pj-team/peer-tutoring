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
	try {
		const sessions = await getSessionsMatView(supabase, { tutor_id: tutor_id });
		// console.log("sessions: ", sessions);
	} catch (e) {
		console.log("error", e);
	}
	return (
		<>
			{/* {sessions.map((session: TSessionsMatViewResult) => (
              <GeneralSessionCard
                page="browse"
                className="rounded-none"
                key={session.session_name}
                content={session}
                type={""}
              />
            ))} */}
		</>
	);
};

export default SessionList;
