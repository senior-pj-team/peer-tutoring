"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useInfiniteStudentSessions } from "@/hooks/use-infinite-student-session";
import SessionCard from "../../shared/sessions/session-card";

type PaginationProps = {
	currentPage: number;
	onPageChange: (page: number) => void;
	disableBack: boolean;
	disableForward: boolean;
};

const PaginationControls = ({
	currentPage,
	onPageChange,
	disableBack,
	disableForward,
}: PaginationProps) => (
	<div className="flex items-center justify-center gap-6 mt-6">
		<button
			onClick={() => onPageChange(currentPage - 1)}
			disabled={disableBack}
			className="flex items-center gap-1 px-4 py-2 rounded-sm text-gray-700 text-xs font-medium transition hover:bg-gray-100"
			aria-label="Previous Page">
			<ChevronLeftIcon className="w-4 h-4" />
			<span className="hidden sm:block">Previous</span>
		</button>

		<span className="text-gray-800 font-medium">{currentPage + 1}</span>

		<button
			onClick={() => onPageChange(currentPage + 1)}
			disabled={disableForward}
			className="text-xs flex items-center gap-1 px-4 py-2 rounded-sm text-gray-700 font-medium transition hover:bg-gray-100"
			aria-label="Next Page">
			<span className="hidden sm:block">Next</span>
			<ChevronRightIcon className="w-4 h-4" />
		</button>
	</div>
);

const StudentSessionList = ({ student_id }: { student_id: string }) => {
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPagesFetched, setTotalPagesFetched] = useState(1);

	const {
		status,
		data: sessions,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isError,
	} = useInfiniteStudentSessions({ student_id });

	const handlePageChange = async (page: number) => {
		if (page < 0) return;

		if (page >= totalPagesFetched) {
			try {
				await fetchNextPage();
				setTotalPagesFetched((prev) => prev + 1);
			} catch (e) {
				return;
			}
		}
		setCurrentPage(page);
	};

	const currentSessions = sessions?.pages?.[currentPage] ?? [];
	const disableBack = useMemo(() => currentPage === 0, [currentPage]);
	const disableForward = useMemo(
		() => !hasNextPage && currentPage >= totalPagesFetched - 1,
		[currentPage, hasNextPage, totalPagesFetched],
	);

	return (
		<section>
			{currentSessions.length > 0 ? (
				<div className="flex flex-wrap gap-6 my-4 justify-start">
					{currentSessions.map(
						(session: TStudentSessionViewResult, index: number) => (
							<div
								key={index}
								className="w-full sm:w-[48%] lg:w-[23%] max-w-[300px] flex-shrink-0">
								<SessionCard page="browse" student_session={session} />
							</div>
						),
					)}
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

export default StudentSessionList;
