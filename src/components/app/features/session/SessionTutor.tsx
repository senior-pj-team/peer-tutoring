import React from "react";
import { Star, Mail, Phone } from "lucide-react";
import ReviewCard from "@/components/app/features/rating-review/review-card";
import GeneralSessionCard from "@/components/app/shared/general-session-card";
import MoreReviewBtn from "@/components/app/features/rating-review/review-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { selectTutorStats } from "@/data/queries/tutors/select-tutor-stats-view";
import TutorStats from "./TutorStats";
import RatingReviewList from "./RatingReviewList";
const SessionTutor = async ({ tutor_id }: { tutor_id: string }) => {
  const sessions = [
    {
      sessionName: "React Redux Nodejs and Kafka basic",
      courseCode: "10125",
      courseName: "Web development",
      school: "Applied Digital Science",
      major: "Computer Engineering",
      price: "400",
      remaining: "2hr",
      description:
        "This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
      tutor: "Eric",
      rating: "5",
      type: "free",
      from: "11:00 AM",
      to: "2:00 PM",
      date: "23 April 2025",
    },
    {
      sessionName: "React with NodeJS",
      courseCode: "10125",
      courseName: "Web development",
      school: "Applied Digital Science",
      major: "Computer Engineering",
      price: "400",
      remaining: "2hr",
      description:
        "This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
      tutor: "Eric",
      rating: "5",
      type: "paid",
      from: "11:00 AM",
      to: "2:00 PM",
      date: "23 April 2025",
    },
    {
      sessionName: "Next JS",
      courseCode: "10125",
      courseName: "Web development",
      school: "Applied Digital Science",
      major: "Computer Engineering",
      price: "400",
      remaining: "2hr",
      description:
        "This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
      tutor: "Eric",
      rating: "5",
      type: "paid",
      from: "11:00 AM",
      to: "2:00 PM",
      date: "23 April 2025",
    },
    {
      sessionName: "Machine Learing with SkitLearn",
      courseCode: "10125",
      courseName: "Web development",
      school: "Applied Digital Science",
      major: "Computer Engineering",
      price: "400",
      remaining: "2hr",
      description:
        "This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
      tutor: "Eric",
      rating: "5",
      type: "free",
      from: "11:00 AM",
      to: "2:00 PM",
      date: "23 April 2025",
    },
  ];
  const bio =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?";
  let supabase: TSupabaseClient | null= null;
  let tutorStats: TTutorStatsViewResult | null = null;
	try {
    supabase = await createClient();
    if (supabase) {
    	tutorStats = await selectTutorStats(tutor_id, supabase);
    }
  } catch (e) {
    console.log("error", e);
  }

  if(!tutorStats || ! supabase) return <></> //handle loading or error here
  
  return (
    <div className="max-w-[53rem] p-6 bg-white space-y-6">
	  	{
			tutorStats && <TutorStats data={tutorStats}/>
		}
      <div>
        <h1 className="flex gap-5 items-center text-lg font-bold">
        <div className="flex gap-2 items-center">
          <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
          <span>{tutorStats.tutor_rating} Overall rating</span>
        </div>
        |<span>{tutorStats.reviews_count} Reviews</span>
      </h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
        <RatingReviewList tutor_id={tutor_id} supabase={supabase}/>
      </div>
      <MoreReviewBtn />
        <div>
          <h1 className="text-lg font-bold mt-5">More sessions by John Doe</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
            {sessions.map((session) => (
              <GeneralSessionCard
                page="browse"
                className="rounded-none"
                key={session.sessionName}
                content={session}
                type={""}
              />
            ))}
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
