"use client";

import React from "react";
import GeneralSessionCard from "@/components/app/shared/general-session-card";

// const getRemainingTime = (date: string, startTime: string) => {
//   const now = new Date();
//   const startDateTime = new Date(`${date} ${startTime}`);

//   const diffMs = startDateTime.getTime() - now.getTime();

//   if (diffMs <= 0) {
// 	return "Started";
//   }

//   const diffMinutes = Math.floor(diffMs / (1000 * 60));
//   const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//   if (diffDays > 0) {
// 	return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
//   } else if (diffHours > 0) {
// 	return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
//   } else if (diffMinutes > 0) {
// 	return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
//   } else {
// 	return "Soon";
//   }
// };

const Page = () => {
	const sessions = [
		{
			id: 1,
			image: "/React.png",
			sessionName: "Full Stack Web Development Bootcamp",
			courseCode: "FSWD2025",
			courseName: "Web Development",
			school: "Applied Digital Technology",
			major: "Software Engineering",
			status: "enrolled",
			tutorName: "John Doe",
			tutorRating: "4.9",
			description:
				"Dive deep into modern web development techniques, covering both frontend and backend technologies...",
			requirements:
				"Basic understanding of HTML, CSS, and JavaScript is recommended.",
			date: "April 20, 2025",
			startTime: "10:00 AM",
			endTime: "4:00 PM",
			maxStudent: 30,
			enrolledStudent: 25,
			remainingSlot: 5,
			price: "150",
		},
		{
			id: 2,
			image: "/Courses.jpg",
			sessionName: "Creative UI/UX Design Workshop",
			courseCode: "UIUX2030",
			courseName: "UI/UX Design",
			school: "Applied Digital Technology",
			major: "Interaction Design",
			status: "enrolled",
			tutorName: "Emily Clark",
			tutorRating: "4.9",
			description:
				"Explore the art and science of user interface and user experience design...",
			requirements: "No prior experience required.",
			date: "May 5, 2025",
			startTime: "1:00 PM",
			endTime: "5:00 PM",
			maxStudent: 25,
			enrolledStudent: 22,
			remainingSlot: 3,
			price: "150",
		},
		{
			id: 3,
			image: "/Courses.jpg",
			sessionName: "Cosmetic Product Innovation",
			courseCode: "CPI2025",
			courseName: "Cosmetic Science",
			school: "School of Cosmetic Science",
			major: "Cosmetic Chemistry",
			status: "enrolled",
			tutorName: "Samantha Lee",
			tutorRating: "4.9",
			description: "Discover the science behind cosmetic products...",
			requirements: "Basic knowledge of chemistry is an advantage.",
			date: "June 1, 2025",
			startTime: "2:00 PM",
			endTime: "6:00 PM",
			maxStudent: 15,
			enrolledStudent: 13,
			remainingSlot: 2,
			price: "150",
		},
		{
			id: 4,
			image: "/Chinese.jpg",
			sessionName: "Business Chinese Communication",
			courseCode: "CHN2002",
			courseName: "Chinese Business Language",
			school: "School of Languages",
			major: "Mandarin Chinese",
			status: "enrolled",
			tutorName: "Chen Ming",
			tutorRating: "4.9",
			description:
				"Develop the language skills needed for effective communication in a Chinese business environment.",
			requirements: "Basic Chinese knowledge recommended.",
			date: "May 25, 2025",
			startTime: "1:00 PM",
			endTime: "4:00 PM",
			maxStudent: 15,
			enrolledStudent: 13,
			remainingSlot: 2,
			price: "150",
		},
		{
			id: 5,
			image: "/React.png",
			sessionName: "Advanced Machine Learning Techniques",
			courseCode: "ML5000",
			courseName: "Machine Learning",
			school: "Applied Digital Technology",
			major: "Artificial Intelligence",
			status: "enrolled",
			tutorName: "David Kim",
			tutorRating: "4.9",
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
			price: "150",
		},
		{
			id: 6,
			image: "/React.png",
			sessionName: "Cloud Architecture Fundamentals",
			courseCode: "CLOUD200",
			courseName: "Cloud Computing",
			school: "Applied Digital Technology",
			major: "Information Systems",
			status: "enrolled",
			tutorName: "Sophia Brown",
			tutorRating: "4.9",
			description: "Master the basics of cloud computing architecture...",
			requirements: "Basic networking and IT knowledge preferred.",
			date: "July 1, 2025",
			startTime: "10:00 AM",
			endTime: "2:00 PM",
			maxStudent: 25,
			enrolledStudent: 20,
			remainingSlot: 5,
			price: "150",
		},
		{
			id: 7,
			image: "/Chinese.jpg",
			sessionName: "Beginner Chinese Language",
			courseCode: "CHN1001",
			courseName: "Chinese Language",
			school: "School of Languages",
			major: "Mandarin Chinese",
			status: "enrolled",
			tutorName: "Li Wei",
			tutorRating: "4.9",
			description:
				"Learn the basics of Mandarin Chinese including pronunciation, basic grammar, and conversation practice.",
			requirements:
				"No prior Chinese knowledge required. Willingness to practice speaking is a must.",
			date: "May 15, 2025",
			startTime: "9:00 AM",
			endTime: "11:00 AM",
			maxStudent: 20,
			enrolledStudent: 18,
			remainingSlot: 2,
			price: "150",
		},
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{sessions.map((session) => (
				<GeneralSessionCard
					page="browse"
					key={session.id}
					content={{
						id: session.id,
						sessionName: session.sessionName,
						courseCode: session.courseCode,
						courseName: session.courseName,
						school: session.school,
						major: session.major,
						price: session.price,
						description: session.description,
						tutor: session.tutorName,
						rating: session.tutorRating,
						from: session.startTime,
						to: session.endTime,
						date: session.date,
					}}
				/>
			))}
		</div>
	);
};

export default Page;
