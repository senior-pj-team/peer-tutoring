import { getRatingReview } from "@/data/queries/rating-and-review/get-rating-review-user-view";

export const fetchReviews = async ({
	pageParam = 0,
	tutor_id,
	search = "",
	supabase,
	LIMIT
}: {
	pageParam: number;
	tutor_id: string;
	search?: string;
	supabase: TSupabaseClient; 
	LIMIT: number
}) => {
	const data = await getRatingReview(supabase, {
		offset: pageParam,
		limit: LIMIT,
		tutor_id,
		search,
	});
	if (!data) throw new Error("Error fetching");
	return data;
};
