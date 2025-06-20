'use server';

import { createClient } from '@/utils/supabase/server';
import { getUserSession } from '@/utils/get-user-session';
import { z } from 'zod';
import { insertRatingReview } from '@/data/mutations/rating-and-review/insert-rating-review';

const schema = z.object({
  session_id: z.coerce.number(),
  ss_id: z.coerce.number(),
  rating: z.coerce.number().min(1).max(5),
  review: z.string().min(1),
});

export async function submitRatingReview(
  _: ActionResponseType<string>,
  formData: FormData
): Promise<ActionResponseType<string>> {
  const supabase = await createClient();
  const user = await getUserSession();

  if (!user?.user_id) {
    return {
      success: false,
      error: { message: 'You must be logged in to submit a review.' },
    };
  }

  const parsed = schema.safeParse({
    session_id: formData.get('session_id'),
    ss_id: formData.get('ss_id'),
    rating: formData.get('rating'),
    review: formData.get('review'),
  });

  if (!parsed.success) {
    return {
      success: false,
      error: { message: 'Invalid input. Please check your review and rating.' },
    };
  }

  const { session_id, ss_id, rating, review } = parsed.data;

  const insertResult = await insertRatingReview(
    ss_id,
    user.user_id,
    session_id,
    rating,
    review,
    supabase
    )
  if(!insertResult) return {
    success: false,
    error: {message: "Something went wrong"}
  }
  return {
    success: true,
    data: "Your rating and review has been submitted"
  }
}
