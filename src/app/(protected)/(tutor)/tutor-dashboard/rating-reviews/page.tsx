import ReviewDialogContent from "@/components/app/features/rating-review/review-dialog-content";
import GeneralError from "@/components/app/shared/error";
import GeneralLoading from "@/components/app/shared/GeneralLoading";
import { getTutorWithStats } from "@/data/queries/tutors/get-tutor-with-stats";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";
import { Star } from "lucide-react";
import React, { Suspense } from "react";

const page = async () => {
	const user= await getUserSession()
	const supabase= await createClient()
	if( !user || !supabase ) return <GeneralError/>

	const data= await getTutorWithStats(supabase,{p_filter_tutor_id: user.user_id});
	if(!data || data.length!=1) return "error"
	const tutorStats= data[0];

	return (
		<>
			<div className="flex flex-wrap gap-3 items-center text-base md:text-lg font-bold mt-2">
				<div className="flex gap-2 items-center">
					<Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
					<span>{tutorStats.tutor_rating} Overall rating</span>
				</div>
				<span className="hidden sm:inline">|</span>
				<span>{tutorStats.total_review_count} ratings and reviews</span>
			</div>
			<Suspense fallback={<GeneralLoading/>}>
				<ReviewDialogContent tutor_id={user.user_id}/>
			</Suspense>
		</>
	);
};

export default page;
