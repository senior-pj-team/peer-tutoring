"use server";

import { createClient } from "@/utils/supabase/server";
import { getUserSession } from "@/utils/get-user-session";
import { z } from "zod";
import { insertRatingReview } from "@/data/mutations/rating-and-review/insert-rating-review";

const schema = z.object({
	ss_id: z.coerce.number(),
	rating: z.coerce.number().min(1).max(5),
	review: z.string().min(1),
});

export async function submitRatingReview(
	_: ActionResponseType<string>,
	formData: FormData,
): Promise<ActionResponseType<string>> {
	const supabase = await createClient();
	const user = await getUserSession();

	if (!user?.user_id) {
		return {
			success: false,
			error: { message: "Somemthing went wrong ❌" },
		};
	}

	const parsed = schema.safeParse({
		ss_id: formData.get("ss_id"),
		rating: formData.get("rating"),
		review: formData.get("review"),
	});

	if (!parsed.success) {
		return {
			success: false,
			error: { message: "Invalid input ❌" },
		};
	}

	const { ss_id, rating, review } = parsed.data;

	const insertResult = await insertRatingReview(
		ss_id,

		rating,
		review,
		supabase,
	);
	if (!insertResult)
		return {
			success: false,
			error: { message: "Something went wrong ❌" },
		};
	return {
		success: true,
	};
}
