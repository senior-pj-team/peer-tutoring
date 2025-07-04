"use client";

import { usePaginatedSessionsMatViewQuery } from "@/hooks/use-sessions-mat-view";
import { useMemo, useState } from "react";
import { DebounceSearchBar } from "../../../shared/debounce-search-bar";
import GeneralSessionCard from "../../../shared/sessions/general-session-card";
import { SessionSkeletonList } from "../../../shared/sessions/session-skeleton-list";
import { Button } from "@/components/ui/button";
import {
	ArchiveX,
	ArrowLeftIcon,
	ArrowRightIcon,
	BookmarkCheck,
	BookOpen,
	CircleX,
	FolderClosed,
	Search,
} from "lucide-react";
import { MultiSelect } from "@/components/ui/mutil-select";
import { LoadingDots } from "../../../shared/loading-dots";

const LIMIT = 12;
const statuesList = [
	{ value: "open", label: "open", icon: BookOpen },
	{ value: "closed", label: "closed", icon: FolderClosed },
	{ value: "completed", label: "completed", icon: BookmarkCheck },
	{ value: "archived", label: "archived", icon: ArchiveX },
	{ value: "cancelled", label: "cancelled", icon: CircleX },
];
export function SessionList() {
	const [search, setSearch] = useState<string>("");
	const [statuses, setStatuses] = useState<TSessionStatus[] | null>(null);
	const [page, setPage] = useState<number>(1);
	const { data, isLoading, isError, isPlaceholderData, isFetching } =
		usePaginatedSessionsMatViewQuery({
			key: "sessions",
			page,
			limit: LIMIT,
			search,
			status: statuses,
		});

	const sessions = data?.rows;
	const hasMore = useMemo(() => {
		return page < Math.ceil((data?.total ?? 0) / LIMIT);
	}, [page, data]);

	return (
		<div className="mt-3 h-full">
			{/* Filters */}
			<div className="mb-6 flex items-center gap-4">
				<div className="relative flex-5">
					<div className="absolute inset-y-0 left-2  flex items-center pointer-events-none pr-2">
						<Search className="text-gray-500" size={20} />
					</div>
					<DebounceSearchBar
						type="text"
						placeholder="Search with anything..."
						className="rounded-md border min-h-10 h-auto px-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						query={search}
						setQuery={setSearch}
					/>
				</div>

				<div className="flex-4">
					<MultiSelect
						options={statuesList}
						onValueChange={(values: string[]) => {
							setPage(1);
							if (values.length < 1) {
								setStatuses(null);
							} else {
								setStatuses(values as TSessionStatus[]);
							}
						}}
						defaultValue={statuses ?? undefined}
						placeholder="Select statues"
						variant="inverted"
						maxCount={2}
					/>
				</div>
			</div>

			{/* Stats Overview */}
			{/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
				<div className="bg-white p-4 rounded-lg border border-gray-200">
					<div className="text-sm text-gray-500">Total Sessions</div>
					<div className="text-2xl font-bold">{10}</div>
				</div>
				<div className="bg-white p-4 rounded-lg border border-gray-200">
					<div className="text-sm text-gray-500">Open Sessions</div>
					<div className="text-2xl font-bold text-green-600">{50}</div>
				</div>
				<div className="bg-white p-4 rounded-lg border border-gray-200">
					<div className="text-sm text-gray-500">Total Enrollments</div>
					<div className="text-2xl font-bold">{20}</div>
				</div>
			</div> */}
			{/* Sessions Grid */}
			{isError && (
				<div className="flex justify-center items-center h-100 text-md text-red-500">
					Something went Wrong ❌
				</div>
			)}

			{isLoading && <SessionSkeletonList />}

			{!isLoading && (!sessions || sessions.length < 0) && (
				<div className="h-full p-8 text-center">
					<h3 className="text-lg font-medium text-gray-900 mb-1">
						👽 No sessions found
					</h3>
				</div>
			)}
			{sessions && (
				<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
					{sessions.map((session, index) => (
						<GeneralSessionCard key={index} content={session} page="admin" />
					))}
				</div>
			)}
			{data && (
				<div className="px-5 flex items-center justify-between mt-3">
					<Button
						className="px-4 py-6 text-white  bg-black rounded-none text-md cursor-pointer  hover:bg-black/75 flex items-center gap-1"
						onClick={() => setPage((old) => Math.max(old - 1, 0))}
						disabled={page === 1}>
						<ArrowLeftIcon size={12} />
						Previous
					</Button>
					<Button
						className="px-4 py-6 text-white  bg-black rounded-none text-md cursor-pointer  hover:bg-black/75 "
						disabled={isFetching || isPlaceholderData || !hasMore}
						onClick={() => {
							if (!isPlaceholderData && hasMore) {
								setPage((prev) => prev + 1);
							}
						}}>
						{isFetching ? (
							<div className="flex items-center gap-1">
								<span>Next</span>
								<LoadingDots />
							</div>
						) : (
							<div className="flex items-center gap-1">
								{hasMore ? "Next" : "Loaded all"}
								<ArrowRightIcon size={12} />
							</div>
						)}
					</Button>
				</div>
			)}
		</div>
	);
}
