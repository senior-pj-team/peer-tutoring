"use client";

import React, { useMemo, useState } from "react";
import GeneralSessionCard from "../../shared/sessions/general-session-card";
import { PaginationControls } from "../../shared/paginition-controls";
import { usePaginatedSessionsMatViewQuery } from "@/hooks/use-sessions-mat-view";

const TutorSessionsSection = ({ tutor_id }: { tutor_id: string }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const {
		data: sessions,
		isError,
		status,
	} = usePaginatedSessionsMatViewQuery({
		key: "tutor-sessions",
		page: currentPage + 1, // paginition button shows currentPage +1 so keep it as 0 and +1 to use it in the hook
		limit: 4,
		tutor_id,
	});

	const currentSessions = sessions?.rows ?? [];
	const totalSessions = sessions?.total ?? 0;

	const disableBack = useMemo(() => currentPage <= 0, [currentPage]);

	const totalPages = Math.ceil(totalSessions / 4);
	const disableForward = useMemo(
		() => currentPage >= totalPages - 1,
		[currentPage, totalPages],
	);
	return (
		<section>
			{currentSessions.length > 0 ? (
				<div className="flex flex-wrap gap-6 my-4 justify-start">
					{currentSessions.map((session: any, index: number) => (
						<div
							key={index}
							className="w-full sm:w-[48%] lg:w-[23%] max-w-[300px] flex-shrink-0">
							<GeneralSessionCard content={session} />
						</div>
					))}
				</div>
			) : status === "pending" ? (
				<div className="h-[33vh] flex items-center justify-center text-gray-400 text-lg">
					Loading sessions...
				</div>
			) : isError ? (
				<div className="h-[33vh] flex items-center justify-center text-red text-lg">
					Failed to load more sessions. Please try again.
				</div>
			) : (
				<div className="h-[33vh] flex items-center justify-center text-gray-500 text-lg">
					No sessions available.
				</div>
			)}

			<PaginationControls
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				disableBack={disableBack}
				disableForward={disableForward || status === "pending"}
			/>
		</section>
	);
};

export default TutorSessionsSection;
