import React from "react";
import { Star, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { selectTutorStats } from "@/data/queries/tutors/select-tutor-stats-view";
import TutorStats from "./TutorStats";
import SessionList from "./SessionList";
import TutorRARSection from "../tutor/TutorRARSection";

const SessionTutor = async ({ tutor_id }: { tutor_id: string }) => {
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
  if (!tutorStats || !supabase) return <></>; //handle loading or error here

  return (
    <div className="max-w-[53rem] p-6 bg-white space-y-6">
      {tutorStats && <TutorStats data={tutorStats} />}

      <div>

        {/* Rating Review Section */}
        <h1 className="flex gap-5 items-center text-lg font-bold">
          <div className="flex gap-2 items-center">
            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            <span>{tutorStats.tutor_rating} Overall rating</span>
          </div>
          |<span>{tutorStats.reviews_count} Reviews</span>
        </h1>
        <TutorRARSection supabase={supabase} tutor_id={tutor_id} initialSize={4} overallRating={tutorStats.tutor_rating?? 0} rarCount={tutorStats.reviews_count?? 0}/>

        {/* Sessions Section */}
        <div>
          <h1 className="text-lg font-bold mt-5">
            More sessions by {tutorStats.tutor_name}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
            <SessionList tutor_id={tutor_id} supabase={supabase} />
          </div>
          <Link href={"/tutor-view"}>
            <Button
              variant="outline"
              className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm cursor-pointer w-full"
            >
              View all sessions
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SessionTutor;
