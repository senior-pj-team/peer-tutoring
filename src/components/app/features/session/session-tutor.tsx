import React, { Suspense } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

import TutorStats from "./tutor-stats";
import SessionList from "./session-list";
import TutorRARSection from "../tutor/tutor-RAR-section";
import { getTutorWithStats } from "@/data/queries/tutors/get-tutor-with-stats";
import GeneralLoading from "../../shared/general-loading";

const SessionTutor = async ({ tutor_id }: { tutor_id: string }) => {
	const supabase = await createClient();

	const data = await getTutorWithStats(supabase, {
		p_filter_tutor_id: tutor_id,
	});

	if (!data)
		return (
			<>
				<div className="text-[1rem] md:text-lg  max-w-[53rem] p-6 bg-white space-y-6 h-[25rem] ">
					Something went wrong ⚠️
				</div>
			</>
		);
	const tutor = data[0];

	return (
		<div className="max-w-[53rem] p-6 bg-white space-y-6">
			{tutor && <TutorStats data={tutor} />}

			<div>
				{/* Rating Review Section */}
				<h1 className="flex gap-5 items-center text-xl font-bold">
					<div className="flex gap-2 items-center">
						<Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
						<span>{tutor.tutor_rating} Overall rating</span>
					</div>
					|<span>{tutor.total_review_count} Reviews</span>
				</h1>
				<Suspense fallback={<GeneralLoading />}>
					<TutorRARSection
						tutor_id={tutor_id}
						initialSize={4}
						overallRating={tutor.tutor_rating ?? 0}
						rarCount={tutor.total_review_count ?? 0}
					/>
				</Suspense>

				{/* Sessions Section */}
				<div>
					<h1 className="text-xl font-bold mt-5">
						{tutor.total_session_count} sessions 📗 by {tutor.username}
					</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
						<Suspense fallback={<GeneralLoading />}>
							<SessionList tutor_id={tutor_id} supabase={supabase} />
						</Suspense>
					</div>
					<Link href={`/home/tutor-view/${tutor_id}`}>
						<Button
							variant="outline"
							className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm cursor-pointer w-full">
							View all sessions
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SessionTutor;
