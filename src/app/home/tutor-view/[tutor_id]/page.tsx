import React, { Suspense } from "react";
import { Mail, Phone, Star } from "lucide-react";
import Expandable from "@/components/app/shared/expandable-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TutorRARSection from "@/components/app/features/tutor/tutor-RAR-section";
import { createClient } from "@/utils/supabase/server";
import { parseISO, format } from "date-fns";
import TutorSessionsSectionServer from "@/components/app/features/tutor/tutor-sessions-section-server";
import { GoToChatButton } from "@/components/app/shared/go-to-chat-button";
import { getUserSession } from "@/utils/get-user-session";
import GeneralError from "@/components/app/shared/error";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { SessionSkeletonList } from "@/components/app/shared/sessions/session-skeleton-list";
import { getTutorWithStats } from "@/data/queries/tutors/get-tutor-with-stats";
import { getYear } from "@/utils/app/get-year";
import GeneralLoading from "@/components/app/shared/general-loading";

type Params = Promise<{
	tutor_id: string;
}>;

const Page = async ({ params }: { params: Params }) => {
	const { tutor_id } = await params;
	const supabase = await createClient();
	let data = await getTutorWithStats(supabase, { p_filter_tutor_id: tutor_id });
	if (!data || data.length == 0) return <GeneralError />;

	const tutorStats = data[0] as Omit<
		TTutorWithStatsResult[number],
		"social_links"
	> & {
		social_links:
			| {
					value: string;
			  }[]
			| null;
	};
	const user = await getUserSession();

	return (
		<>
			<div className="max-w-full mx-auto pt-8 pb-5 xl:px-30 px-5 flex flex-col md:flex-row gap-10">
				<div className="w-full md:w-1/3 text-center md:text-left">
					<Avatar className="w-48 h-48 my-5">
						<AvatarImage src={tutorStats.profile_url ?? ""} alt="User Avatar" />
						<AvatarFallback className="text-3xl">
							{getAvatarFallback(tutorStats.username)}
						</AvatarFallback>
					</Avatar>
					<div className="flex items-center gap-x-1.5">
						<div className="mt-4 text-xl font-semibold mb-3">
							{tutorStats.username}
						</div>
						{user && (
							<GoToChatButton
								user1_id={tutor_id}
								user2_id={user ? user.user_id : null}
							/>
						)}
					</div>

					<p className="text-sm text-gray-500">
						{" "}
						{tutorStats.school} | {tutorStats.major}
					</p>
					<p className="text-sm text-gray-500 mt-1">
						{getYear(tutorStats.year)}
					</p>

					<div className="text-sm text-green-800 my-3">
						Joined at{" "}
						<span className="font-extrabold">
							{
								tutorStats.registered_tutor_at 
								? format(
								parseISO(tutorStats.registered_tutor_at),
								"yyyy MMMM dd",
							)
							: "NA"
							}
						</span>
					</div>
					<div className="mt-6">
						<h4 className="text-sm font-bold mb-3">📧 Contact Information</h4>
						<div className="text-sm flex items-center gap-5">
							<Mail size={15} />
							<span className="text-gray-700">{tutorStats.email ?? "NA"}</span>
						</div>
						<div className="text-sm flex items-center gap-5 mt-2">
							<Phone size={15} />
							<span className="text-gray-700">
								{tutorStats.phone_number ?? "NA"}
							</span>
						</div>
					</div>
					{tutorStats.social_links && tutorStats.social_links.length > 0 && (
						<div className="mt-6 ">
							<h4 className="text-sm font-bold mb-3">🔗 Social Links</h4>
							{tutorStats.social_links.map((link, idx) => {
								return (
									<div
										key={idx}
										className="text-sm flex items-center gap-2 mt-1">
										<a
											href={link.value}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 underline break-all">
											{link.value}
										</a>
									</div>
								);
							})}
						</div>
					)}
				</div>

				<div className="w-full md:w-2/3 my-5">
					<div>
						<div className="flex items-center justify-between">
							<div className="flex flex-col items-center ">
								<div className="text-lg text-gray-600">🎓 Students</div>
								<div className="text-2xl font-extrabold ">
									{tutorStats.total_student_count}
								</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="text-lg">📗 Sessions</div>
								<div className="text-2xl font-extrabold">
									{tutorStats.total_session_count}
								</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="text-lg">📝 Reviews</div>
								<div className="text-2xl font-extrabold">
									{tutorStats.total_review_count}
								</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="text-lg">🌟 Rating</div>
								<div className="text-2xl font-extrabold">
									{tutorStats.tutor_rating}
								</div>
							</div>
						</div>

						<div className="mt-10">
							<h1 className="text-xl font-extrabold">About me</h1>
							<p className="my-6 text-xl">{tutorStats.bio_highlight}</p>
							<Expandable
								max={350}
								className="text-gray-100"
								text={
									tutorStats.biography ?? "tutor has not filled no bio yet 📜"
								}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="xl:px-30 px-5 mb-6 mt-0">
				<h1 className="flex gap-5 items-center text-xl font-bold">
					<div className="flex gap-2 items-center">
						<Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
						<span>{tutorStats.tutor_rating} Overall rating</span>
					</div>
					|<span>{tutorStats.total_review_count} Reviews</span>
				</h1>
				<Suspense fallback={<GeneralLoading />}>
					<TutorRARSection
						tutor_id={tutor_id}
						initialSize={6}
						overallRating={tutorStats.tutor_rating ?? 0}
						rarCount={tutorStats.total_review_count ?? 0}
					/>
				</Suspense>
				<h1 className="text-xl font-bold mt-7">
					Sessions offered by {tutorStats.username}
				</h1>
				<Suspense fallback={<SessionSkeletonList />}>
					<TutorSessionsSectionServer tutor_id={tutor_id} />
				</Suspense>
			</div>
		</>
	);
};

export default Page;
