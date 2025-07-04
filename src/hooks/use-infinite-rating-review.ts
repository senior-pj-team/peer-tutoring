"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchReviews } from "@/utils/app/fetch-reviews";
import { useSupabase } from "./use-supabase";

export const useInfiniteRatingReviews = ({
	tutor_id,
	searchTerm,
}: {
	tutor_id: string;
	searchTerm: string;
}) => {
	const supabase = useSupabase();
	return useInfiniteQuery({
		queryKey: ["reviews and ratings", tutor_id, searchTerm],
		queryFn: ({ pageParam }) =>
			fetchReviews({
				pageParam,
				tutor_id,
				search: searchTerm,
				supabase,
				LIMIT: 5,
			}),
		getNextPageParam: (lastPage, allPages) =>
			lastPage?.length === 5 ? allPages.length * 5 : undefined,
		initialPageParam: 0,
	});
};
