import React from "react";
import EnrolledStudents from "@/components/custom/features/session/enrolled-students";
import Expandable from "@/components/custom/shared/expandable-text";

const page = () => {
	const sessionData = {
		sessionName: "Advanced React Workshop",
		courseCode: "110125",
		courseName: "Web Application Development",
		description:
			"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
		requirements:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi reiciendis laborum iure, provident accusantium quos facilis impedit enim hic necessitatibus minima maxime molestiae ipsum. Molestiae modi nemo soluta voluptates in.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi reiciendis laborum iure, provident accusantium quos facilis impedit enim hic necessitatibus minima maxime molestiae ipsum. Molestiae modi nemo soluta voluptates in.",
		location: "Mae Fah Laung university D1 Library",
		date: "April 20, 2025",
		startTime: "10:00 AM",
		endTime: "12:00 PM",
		maxStudents: 10,
		enrolledStudents: [
			{ name: "Alice", image: "/profile.jpg" },
			{ name: "Bob", image: "/profile.jpg" },
			{ name: "Charlie", image: "/profile.jpg" },
		],
	};
	const remainingSlots =
		sessionData.maxStudents - sessionData.enrolledStudents.length;
	return (
		<div>
			<div className="max-w-4xl p-6 bg-white space-y-6">
				<div>
					<h2 className="text-lg font-semibold mb-1">Description</h2>
					<Expandable
						max={200}
						text={sessionData.description}
						className="mt-5 text-sm"
					/>
				</div>
				<div>
					<h2 className="text-lg font-semibold mb-1">Requirements</h2>
					<Expandable
						max={200}
						text={sessionData.requirements}
						className="mt-5 text-sm"
					/>
				</div>
				<div>
					<h2 className="text-lg font-semibold mb-1">Location</h2>
					<Expandable
						max={200}
						text={sessionData.location}
						className="mt-5 text-sm"
					/>
				</div>
				{/* date time */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 mt-10">
					<div>
						<span className="font-semibold">Date:</span> {sessionData.date}
					</div>
					<div>
						<span className="font-semibold">Start Time: </span>
						<span className="text-green-700 text-[0.8rem]">
							{sessionData.startTime}
						</span>
					</div>
					<div>
						<span className="font-semibold">End Time: </span>
						<span className="text-green-700 text-[0.8rem]">
							{sessionData.endTime}
						</span>
					</div>
				</div>
				{/* max student, enrolled students, remaining slots*/}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 mt-5">
					<div>
						<span className="font-semibold">Max Students: </span>
						{sessionData.maxStudents}
					</div>
					<div>
						<span className="font-semibold">Enrolled: </span>
						{sessionData.enrolledStudents.length}
					</div>
					<div>
						<span className="font-semibold">Remaining Slots: </span>
						{remainingSlots}
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
