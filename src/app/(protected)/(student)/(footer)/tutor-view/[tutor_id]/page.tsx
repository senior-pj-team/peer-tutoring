import React, { Suspense } from "react";
import { Mail, Phone, Star } from "lucide-react";
import Rating from "@/components/app/features/rating-review/rating";
import Expandable from "@/components/app/shared/expandable-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TutorRARSection from "@/components/app/features/tutor/tutor-RAR-section";
import { createClient } from "@/utils/supabase/server";
import { getTutorStats } from "@/data/queries/tutors/get-tutor-stats-view";
import { parseISO, format } from "date-fns";
import TutorSessionsSectionServer from "@/components/app/features/tutor/tutor-sessions-section-server";
import { GoToChatButton } from "@/components/app/shared/go-to-chat-button";
import { getUserSession } from "@/utils/get-user-session";
import GeneralError from "@/components/app/shared/error";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import {ReviewCardSkeleton} from "@/components/app/shared/skeletons/review-card-skeletons";
import { SessionSkeletonList } from "@/components/app/shared/sessions/session-skeleton-list";

const Page = async ({ params }: { params: { tutor_id: string } }) => {
	const { tutor_id } = await params;
	const supabase = await createClient();
	let data = await getTutorStats(tutor_id, supabase);
	if (!data) return <GeneralError />;
	const tutorStats = data[0];
	const user = await getUserSession();
	if (!user) return;
	return (
		<>
			<div className="max-w-full mx-auto py-8 xl:px-30 px-5 flex flex-col md:flex-row gap-10">
				<div className="w-full md:w-1/3 text-center md:text-left">
					<Avatar className="w-48 h-48 my-5">
						<AvatarImage
							src={user.profile_url ?? ""}
							alt="User Avatar"
						/>
						<AvatarFallback className="text-3xl">
							{getAvatarFallback(user.full_name)}
						</AvatarFallback>
					</Avatar>
					<h2 className="mt-4 text-xl font-semibold mb-3">
						{tutorStats.tutor_name}
					</h2>
					<p className="text-sm text-gray-500">
						{" "}
						{tutorStats.school} | {tutorStats.major}
					</p>
					<p className="text-xs text-gray-400 mt-1">
						Year- {tutorStats.year ?? "Year-NA"}
					</p>

					<div className="text-sm text-green-800 my-3">
						Joined at{" "}
						<span className="font-extrabold">
							{format(
								parseISO(tutorStats.registered_tutor_at ?? "NA"),
								"yyyy MMMM dd",
							) ?? "NA"}
						</span>
					</div>
					<div className="mt-6">
						<h4 className="text-sm  font-bold mb-3">Contact Information</h4>
						<div className="text-sm flex items-center gap-5">
							<Mail size={15} />
							<span className="text-gray-700">{tutorStats.email ?? "NA"}</span>
						</div>
						<div className="text-sm flex items-center gap-5">
							<Phone size={15} />
							<span className="text-gray-700">
								{tutorStats.phone_number ?? "NA"}
							</span>
						</div>
					</div>
				</div>

				<div className="w-full md:w-2/3">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-gray-600 mb-1">Rating</p>
							<div className="flex items-center gap-2">
								<Rating rating={tutorStats.tutor_rating ?? 0} />
							</div>
						</div>
						<GoToChatButton
							user1_id={tutor_id}
							user2_id={user ? user.user_id : null}
						/>
					</div>
					<hr className="my-6" />
					<div>
						<div className="flex items-center justify-between">
							<div className="flex flex-col text-left">
								<div className="text-xl font-extrabold">
									{tutorStats.students_count}
								</div>
								<div className="text-sm">Students</div>
							</div>
							<div className="flex flex-col text-left">
								<div className="text-xl font-extrabold">
									{tutorStats.session_count}
								</div>
								<div className="text-sm">Sessions</div>
							</div>
							<div className="flex flex-col text-left">
								<div className="text-xl font-extrabold">
									{tutorStats.reviews_count}
								</div>
								<div className="text-sm">Reviews</div>
							</div>
							<div className="flex flex-col text-left">
								<div className="text-xl font-extrabold">
									{tutorStats.tutor_rating}
								</div>
								<div className="text-sm">Rating</div>
							</div>
						</div>

						<div className="mt-20">
							<h1 className="text-3xl font-extrabold">About me</h1>
							<p className="my-6 text-xl">{tutorStats.bio_highlight}</p>
							<Expandable
								max={350}
								className="text-gray-100"
								text={tutorStats.biography ?? "NA"}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="xl:px-30 px-5 my-6">
				<h1 className="flex gap-5 items-center text-lg font-bold">
					<div className="flex gap-2 items-center">
						<Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
						<span>{tutorStats.tutor_rating} Overall rating</span>
					</div>
					|<span>{tutorStats.reviews_count} Reviews</span>
				</h1>
				<Suspense fallback={<ReviewCardSkeleton/>}>
					<TutorRARSection
						tutor_id={tutor_id}
						initialSize={6}
						overallRating={tutorStats.tutor_rating ?? 0}
						rarCount={tutorStats.reviews_count ?? 0}
					/>
				</Suspense>
				<h1 className="text-lg font-bold mt-7">
					Sessions offered by {tutorStats.tutor_name}
				</h1>
				<Suspense fallback={<SessionSkeletonList/>}>
					<TutorSessionsSectionServer tutor_id={tutor_id} />
				</Suspense>
			</div>
		</>
	);
};

export default Page;
