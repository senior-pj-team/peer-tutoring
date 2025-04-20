import TutorOverallStats from '@/components/custom/tutor-overall-stats'
import React from 'react'
import Expandable from '@/components/custom/expandable-text'
import { Star, Mail, Phone } from 'lucide-react'
import ReviewCard from '@/components/custom/rating-review-report-refund/review-card'
import GeneralSessionCard from '@/components/custom/general-session-card'
const page = () => {
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
    }
  ];
  const bio = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor corporis recusandae dolorem aliquam aut? In recusandae nulla culpa, cupiditate voluptatibus adipisci alias excepturi, pariatur quasi quis quidem explicabo vitae fuga?"
  return (
    <div className="max-w-4xl p-6 bg-white space-y-6">
      <div>
        <div className="flex flex-col mb-2 text">
          <span className="max-w-[full] font-bold text-2xl truncate mb-5">
            John Mayer
          </span>
          <div className="text-xs font-bold text-gray-500 ml-[0.2rem] flex item-centers space-x-1.5">
            <Mail size={12} />
            <span className="text-gray-700 font-extrabold">john@example.com</span>
          </div>
          <div className="text-xs font-bold text-gray-500 ml-[0.2rem] flex item-centers space-x-1.5">
            <Phone size={12} />
            <span className="text-gray-700 font-extrabold">+66 847782371</span>
          </div>
        </div>
        <TutorOverallStats />
        <Expandable text={bio} className='mt-5 text-sm' />
      </div>

      <div>
        <h1 className='flex gap-5 items-center text-lg font-bold'>
          <div className='flex gap-2 items-center'>
            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            <span>4.7 Overall rating</span>
          </div>
          |
          <span>86 Ratings</span>
        </h1>
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8'>
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
        <div>
        <h1 className='text-lg font-bold mt-5'>
          More sessions by John Doe
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8'>
          {
            sessions.map((session) => <GeneralSessionCard className='rounded-none' key={session.sessionName} content={session} type={""} />)
          }
        </div>
        <button className="border border-orange-600 hover:bg-orange-200 text-orange-600 px-4 py-2 text-sm cursor-pointer w-full">
          View all sessions
        </button>
        </div>
      </div>
    </div>
  )
}

export default page