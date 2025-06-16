"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { getRatingReview } from "@/data/queries/rating-and-review/get-rating-review-user-view";
import ReviewCard from "./review-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const LIMIT = 5;

const fetchReviews = async ({
	pageParam = 0,
	tutor_id,
	search = "",
}: {
	pageParam: number;
	tutor_id: string;
	search: string;
}) => {
	const supabase = createClient();
	const data = await getRatingReview(supabase, {
		offset: pageParam,
		limit: LIMIT,
		tutor_id,
		search,
	});
	if (!data) throw new Error("Server error");
	return data;
};

export default function RatingReviewList({ tutor_id }: { tutor_id: string }) {
	const [searchInput, setSearchInput] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: ["reviews and ratings", tutor_id, searchTerm],
			queryFn: ({ pageParam }) =>
				fetchReviews({ pageParam, tutor_id, search: searchTerm }),
			getNextPageParam: (lastPage, allPages) =>
				lastPage?.length === LIMIT ? allPages.length * LIMIT : undefined,
			initialPageParam: 0,
		});

	const handleSearch = () => {
		setSearchTerm(searchInput);
	};

	if (status === "pending") return <div>Loading reviews...</div>;
	if (status === "error") return <div>Failed to load reviews</div>;

	return (
		<div>
			<div className="mt-5 flex flex-col md:flex-row gap-2 w-full items-center px-2">
				<input
					type="text"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					placeholder="Search reviews..."
					className="w-full px-3 py-2 text-sm border border-orange-400 rounded-sm focus:outline-none focus:border-orange-800"
				/>
				<Button className="w-full md:w-auto rounded-sm" onClick={handleSearch}>
					Search
				</Button>
			</div>

			<ScrollArea className="h-[60vh] md:h-[70vh] p-4 bg-white space-y-4">
				{data.pages.flat().map((rar, index) => (
					<ReviewCard key={index} data={rar} showTutor={true} />
				))}
				{hasNextPage && (
					<div className="text-center mt-4">
						<Button
							variant="outline"
							onClick={() => fetchNextPage()}
							disabled={isFetchingNextPage}
							className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm md:text-base cursor-pointer rounded-none">
							{isFetchingNextPage ? "Loading..." : "Show more reviews"}
						</Button>
					</div>
				)}
			</ScrollArea>
		</div>
	);
}
