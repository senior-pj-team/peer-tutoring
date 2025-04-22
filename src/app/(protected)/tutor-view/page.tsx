import React from 'react'
import { Mail, Phone, MessageCircle } from 'lucide-react'
import Rating from '@/components/custom/rating-review-report-refund/rating'
import Expandable from '@/components/custom/expandable-text'
import GeneralSessionCard from '@/components/custom/general-session-card'
import Reviews from '@/components/custom/tutor/reviews'

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
    return (
        <>
            <div className="max-w-full mx-auto py-8 xl:px-30 px-5 flex flex-col md:flex-row gap-10">
                {/* Left Column - Avatar & Sidebar Info */}
                <div className="w-full md:w-1/3 text-center md:text-left">
                    <img
                        src="/profile.jpg"
                        alt="Tutor avatar"
                        className="w-[20rem] h-[20rem] mx-auto md:mx-0 object-cover"
                    />
                    <h2 className="mt-4 text-xl font-semibold mb-3">John Doe</h2>
                    <p className="text-sm text-gray-500"> Applied Digital Technology | Computer Engineering</p>
                    <p className="text-xs text-gray-400 mt-1">Third year</p>

                    <div className="text-sm text-green-800 my-3">
                        Joined May <span className="font-extrabold">2025</span>
                    </div>

                    <div className="mt-6">
                        <h4 className="text-sm font-medium font-bold mb-3">Contact Information</h4>
                        <div className="text-sm flex items-center gap-5">
                            <Mail size={15} />
                            <span className="text-gray-700">john@example.com</span>
                        </div>
                        <div className="text-sm flex items-center gap-5">
                            <Phone size={15} />
                            <span className="text-gray-700">+66 847782371</span>
                        </div>
                    </div>
                </div>


                <div className="w-full md:w-2/3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 mb-1">Rating</p>
                            <div className="flex items-center gap-2">
                                <Rating rating={4.6} />
                            </div>
                        </div>
                        <MessageCircle size={30} className="text-orange-500 cursor-pointer hover:text-orange-600" />
                    </div>
                    <hr className='my-6' />
                    <div>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col text-left'>
                                <div className='text-xl font-extrabold'>52</div>
                                <div className='text-sm'>Students</div>
                            </div>
                            <div className='flex flex-col text-left'>
                                <div className='text-xl font-extrabold'>21</div>
                                <div className='text-sm'>Sessions</div>
                            </div>
                            <div className='flex flex-col text-left'>
                                <div className='text-xl font-extrabold'>34</div>
                                <div className='text-sm'>Review</div>
                            </div>
                            <div className='flex flex-col text-left'>
                                <div className='text-xl font-extrabold'>4.7</div>
                                <div className='text-sm'>Rating</div>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <h1 className='text-3xl font-extrabold'>About me</h1>
                            <p className='my-6 text-xl'>Experienced tutor helping students master Math and Coding with clear and engaging lessons.</p>
                            <Expandable className='text-gray-100' text={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed non quaerat molestias nemo deserunt qui optio sapiente beatae officia earum soluta explicabo vero iusto vitae saepe, minima corrupti magni esse?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed non quaerat molestias nemo deserunt qui optio sapiente beatae officia earum soluta explicabo vero iusto vitae saepe, minima corrupti magni esse?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed non quaerat molestias nemo deserunt qui optio sapiente beatae officia earum soluta explicabo vero iusto vitae saepe, minima corrupti magni esse?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed non quaerat molestias nemo deserunt qui optio sapiente beatae officia earum soluta explicabo vero iusto vitae saepe, minima corrupti magni esse?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed non quaerat molestias nemo deserunt qui optio sapiente beatae officia earum soluta explicabo vero iusto vitae saepe, minima corrupti magni esse?"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='xl:px-30 px-5 my-6'>
                <Reviews/>
                
                <h1 className='text-lg font-bold'>
                    Sessions offered by John Doe
                </h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8'>
                    {
                        sessions.map((session) => <GeneralSessionCard className='rounded-none' key={session.sessionName} content={session} type={""} />)
                    }
                </div>
            </div>

        </>
    )
}

export default page