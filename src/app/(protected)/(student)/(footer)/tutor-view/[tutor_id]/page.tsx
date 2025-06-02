import React from "react";
import { Mail, Phone, MessageCircle, Star } from "lucide-react";
import Rating from "@/components/app/features/rating-review/rating";
import Expandable from "@/components/app/shared/expandable-text";
import Image from "next/image";
import TutorRARSection from "@/components/app/features/tutor/TutorRARSection";
import { createClient } from "@/utils/supabase/server";
import { selectTutorStats } from "@/data/queries/tutors/select-tutor-stats-view";
import TutorSessionsSection from "@/components/app/features/tutor/TutorSessionsSection";

const Page = async ({ params }: { params: { tutor_id: string } }) => {
  const { tutor_id } = await params;
  let supabase: TSupabaseClient | null = null;
  let tutorStats: TTutorStatsViewResult | null = null;
  try {
    supabase = await createClient();
    if (supabase) {
      tutorStats = await selectTutorStats(tutor_id, supabase);
    }
  } catch (e) {
    console.log("error", e);
  }
  if (!tutorStats || !supabase) return <></>;
  return (
    <>
      <div className="max-w-full mx-auto py-8 xl:px-30 px-5 flex flex-col md:flex-row gap-10">
        {/* Left Column - Avatar & Sidebar Info */}
        <div className="w-full md:w-1/3 text-center md:text-left">
          <Image
            src={tutorStats.tutor_profile_url ?? "/profile.jpg"}
            alt="Tutor avatar"
            width={200}
            height={200}
            className="w-[20rem] h-[20rem] mx-auto md:mx-0 object-cover"
          />
          <h2 className="mt-4 text-xl font-semibold mb-3">
            {tutorStats.tutor_name}
          </h2>
          <p className="text-sm text-gray-500">
            {" "}
            Applied Digital Technology | Computer Engineering !!
          </p>
          <p className="text-xs text-gray-400 mt-1">Third yea !!r</p>

          <div className="text-sm text-green-800 my-3">
            Joined at <span className="font-extrabold">{"2025"} !!</span>
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
            <MessageCircle
              size={30}
              className="text-orange-500 cursor-pointer hover:text-orange-600"
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
		{/* Rating Review section */}
        <h1 className="flex gap-5 items-center text-lg font-bold">
          <div className="flex gap-2 items-center">
            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            <span>{tutorStats.tutor_rating} Overall rating</span>
          </div>
          |<span>{tutorStats.reviews_count} Reviews</span>
        </h1>
        <TutorRARSection
          supabase={supabase}
          tutor_id="bb069698-5b2f-48e7-a44d-3bda6df88407"
          initialSize={6}
          overallRating={tutorStats.tutor_rating ?? 0}
          rarCount={tutorStats.reviews_count ?? 0}
        />

		{/* Sessions Section */}
        <h1 className="text-lg font-bold mt-7">
          Sessions offered by {tutorStats.tutor_name}
        </h1>
        <TutorSessionsSection supabase={supabase} tutor_id={tutor_id}/>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {sessions.map((session) => (
            <GeneralSessionCard
              page="browse"
              className="rounded-none"
              key={session.sessionName}
              content={session}
              type={""}
            />
          ))}
        </div> */}
      </div>
    </>
  );
};

export default Page;
