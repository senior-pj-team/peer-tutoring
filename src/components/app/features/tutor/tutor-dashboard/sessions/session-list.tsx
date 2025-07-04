"use client";
import { useState } from "react";
import { DebounceSearchBar } from "../../../../shared/debounce-search-bar";
import SessionCard from "../../../../shared/sessions/session-card";

export function SessionList({
	sessions,
	tab,
}: {
	sessions: TSessionsResult[];
	tab: string;
}) {
	const [sessionName, setSessionName] = useState("");
	const filteredSessions = sessions.filter((session) =>
		session.session_name.toLowerCase().includes(sessionName.toLowerCase()),
	);

	return (
		<div className="py-5">
			<DebounceSearchBar
				query={sessionName}
				setQuery={setSessionName}
				placeholder="Search with session name..."
				className="p-4 pr-10 border border-gray-300 rounded-lg focus:outline-primary focus:ring-primary overflow-clip mr-auto"
			/>
			<div className="mb-5"></div>
			<div className="@xl/main:grid-cols-2  @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 ">
				{filteredSessions.length > 0 ? (
					filteredSessions.map((session) => (
						<SessionCard key={session.id} session={session} page="tutor" />
					))
				) : (
					<div className="col-span-full text-center text-gray-500">
						{`No ${tab} sessions found.`}
					</div>
				)}
			</div>
		</div>
	);
}
