import SessionForm from "@/components/custom/features/tutor-dashboard/session-form";
import React from "react";

const page = () => {
	const data = {
		school: "Applied Digital Technology",
		major: "Computer Engineering",
		courseCode: "1501212",
		courseName: "Web Application Development",
		description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae, voluptatem libero reprehenderit, omnis iste dolorem facilis laudantium, alias nesciunt aliquam veritatis ratione aspernatur nihil eos exercitationem quae quo distinctio beatae.",
		requirements: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae, voluptatem libero reprehenderit, omnis iste dolorem facilis laudantium, alias nesciunt aliquam veritatis ratione aspernatur nihil eos exercitationem quae quo distinctio beatae.",
		date: new Date(),
		startTime: "11:00",
		endTime: "13:00",
		maxStudents: 5,
		paid: true,
		amount: 150,
		image: '/React.png'
	}
	return (
			<SessionForm
				school={data.school}
				major={data.major}
				courseCode={data.courseCode}
				courseName={data.courseName}
				description={data.description}
				requirements={data.requirements}
				date={data.date}
				startTime={data.startTime}
				endTime={data.endTime}
				maxStudents={data.maxStudents}
				paid={data.paid}
				amount={data.amount}
				image={data.image}
				isEdit={true}
			/>
	);
};

export default page;
