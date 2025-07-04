"use client";

import React, { useMemo, useState } from "react";
import GeneralSessionCard from "../../shared/sessions/general-session-card";
import { useInfiniteSessions } from "@/hooks/use-infinite-sessions";
import { PaginationControls } from "../../shared/paginition-controls";

const TutorSessionsSection = ({ tutor_id }: { tutor_id: string }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPagesFetched, setTotalPagesFetched] = useState(1);

	const {
		status,
		data: sessions,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isError,
	} = useInfiniteSessions({ tutor_id });

	const handlePageChange = async (page: number) => {
		if (page < 0) return;

		if (page >= totalPagesFetched) {
			try {
				await fetchNextPage();
				setTotalPagesFetched((prev) => prev + 1);
			} catch (e) {
				// Let isError flag handle UI response
				return;
			}
		}
		setCurrentPage(page);
	};

	const currentSessions = sessions?.pages?.[currentPage]?.rows ?? [];
	const disableBack = useMemo(() => currentPage === 0, [currentPage]);
	const disableForward = useMemo(
		() => !hasNextPage && currentPage >= totalPagesFetched - 1,
		[currentPage, hasNextPage, totalPagesFetched],
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
				onPageChange={handlePageChange}
				disableBack={disableBack}
				disableForward={disableForward || isFetchingNextPage}
			/>
		</section>
	);
};

export default TutorSessionsSection;
