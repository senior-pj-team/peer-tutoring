import CustomCarousel from "@/components/app/features/home/custom-carousel";
import { getTutorWithStats } from "@/data/queries/tutors/get-tutor-with-stats";

import { createClient } from "@/utils/supabase/server";

export default async function TopTutorsSection() {
	const supabase = await createClient();
	const tutors = await getTutorWithStats(supabase, {
		p_min_rating: 4.5,
	});
	if (!tutors) {
		return (
			<div className="mt-5 px-10 w-full h-60">
				<div className="text-3xl font-bold tracking-wider">
					<span>Top Rated Tutors 👨‍🎓</span>
				</div>
				<div className="flex w-full h-full justify-center items-center ">
					<span className="font-bold text-gray-400 md:text-3xl text-xl">
						Coming Soon 👽
					</span>
				</div>
			</div>
		);
	}
	return (
		<div className="mt-5 px-10">
			<div className="text-3xl font-bold tracking-wider">
				Top Rated Tutors 👨‍🎓
			</div>
			<CustomCarousel tutors={tutors} />
		</div>
	);
}
