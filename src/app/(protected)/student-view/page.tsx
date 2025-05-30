import SessionCard from "@/components/app/shared/sessions/session-card";
import StudentInfo from "@/components/app/shared/student-info";
import React from "react";
import { Roboto_Mono } from "next/font/google";
const roboto_mono = Roboto_Mono({
	weight: ["700"],
	subsets: ["latin"],
});

const page = () => {
	const sessions = [
		{
			id: 1,
			image: "/React.png",
			sessionName: "Full Stack Web Development Bootcamp",
			courseCode: "10125",
			courseName: "Web Development",
			school: "Applied Digital Technology",
			major: "Software Engineering",
			status: "archived",
			tutorName: "John Doe",
			tutorRating: 4.8,
			description:
				"Deep dive into modern web development techniques, covering both frontend and backend technologies...",
			requirements:
				"Basic understanding of HTML, CSS, and JavaScript is recommended.",
			date: "April 20, 2025",
			startTime: "10:00 AM",
			endTime: "4:00 PM",
			maxStudent: 30,
			enrolledStudent: 25,
			remainingSlot: 5,
		},
		{
			id: 2,
			image: "/Courses.jpg",
			sessionName: "Creative UI/UX Design Workshop",
			courseCode: "10235",
			courseName: "UI/UX Design",
			school: "Applied Digital Technology",
			major: "Interaction Design",
			status: "archived",
			tutorName: "Emily Clark",
			tutorRating: 4.7,
			description:
				"Explore the art and science of user interface and user experience design...",
			requirements: "No prior experience required.",
			date: "May 5, 2025",
			startTime: "1:00 PM",
			endTime: "5:00 PM",
			maxStudent: 25,
			enrolledStudent: 22,
			remainingSlot: 3,
		},
		{
			id: 3,
			image: "/Courses.jpg",
			sessionName: "Data Science for Beginners",
			courseCode: "10345",
			courseName: "Data Science",
			school: "Applied Digital Technology",
			major: "Data Analytics",
			status: "archived",
			tutorName: "Michael Johnson",
			tutorRating: 4.9,
			description: "Learn foundational concepts of data science...",
			requirements:
				"Familiarity with basic programming concepts is helpful but not mandatory.",
			date: "May 10, 2025",
			startTime: "9:00 AM",
			endTime: "12:00 PM",
			maxStudent: 20,
			enrolledStudent: 18,
			remainingSlot: 2,
		},
		{
			id: 4,
			image: "/Courses.jpg",
			sessionName: "Cloud Architecture Fundamentals",
			courseCode: "10455",
			courseName: "Cloud Computing",
			school: "Applied Digital Technology",
			major: "Information Systems",
			status: "archived",
			tutorName: "Sophia Brown",
			tutorRating: 4.5,
			description: "Master the basics of cloud computing architecture...",
			requirements: "Basic networking and IT knowledge preferred.",
			date: "July 1, 2025",
			startTime: "10:00 AM",
			endTime: "2:00 PM",
			maxStudent: 25,
			enrolledStudent: 20,
			remainingSlot: 5,
		},
		{
			id: 5,
			image: "/React.png",
			sessionName: "Advanced Machine Learning Techniques",
			courseCode: "10565",
			courseName: "AI & Robotics",
			school: "Applied Digital Technology",
			major: "Artificial Intelligence",
			status: "archived",
			tutorName: "David Kim",
			tutorRating: 5.0,
			description:
				"Advance your machine learning skills by exploring complex algorithms...",
			requirements:
				"Prior experience in machine learning and proficiency in Python is required.",
			date: "June 15, 2025",
			startTime: "11:00 AM",
			endTime: "5:00 PM",
			maxStudent: 20,
			enrolledStudent: 17,
			remainingSlot: 3,
		},
		{
			id: 6,
			image: "/React.png",
			sessionName: "Cyber Security Essentials",
			courseCode: "10675",
			courseName: "Cyber Security",
			school: "Applied Digital Technology",
			major: "Information Security",
			status: "archived",
			tutorName: "Alex Zhang",
			tutorRating: 4.6,
			description:
				"Understand the core concepts of cybersecurity, risk management, and threat mitigation...",
			requirements: "Basic IT knowledge is recommended.",
			date: "July 10, 2025",
			startTime: "9:00 AM",
			endTime: "12:00 PM",
			maxStudent: 25,
			enrolledStudent: 22,
			remainingSlot: 3,
		},
	];
	return (
		<>
			<div className="mx-30 items-center my-20">
				<StudentInfo />
				<div className="mt-15">
					<h1 className={roboto_mono.className}>
						Previously completed sessions
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-10 mx-10">
						{sessions.map((session) => (
							<SessionCard
								key={session.id}
								id={session.id}
								image={session.image}
								sessionName={session.sessionName}
								courseCode={session.courseCode}
								courseName={session.courseName}
								date={session.date}
								start_time={session.startTime}
								end_time={session.endTime}
								tutor_name={session.tutorName}
								tutor_rating={session.tutorRating}
								enroll_status={session.status}
								page="view"
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default page;
