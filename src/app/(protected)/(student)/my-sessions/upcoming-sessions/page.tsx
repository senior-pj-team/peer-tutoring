import React from "react";
import SessionCard from "@/components/custom/session/session-card";

const page = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			<SessionCard
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
				remainingTime="25 mins"
			/>
			<SessionCard
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
				remainingTime="25 mins"
			/>
			<SessionCard
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
				remainingTime="25 mins"
			/>
			<SessionCard
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
				remainingTime="25 mins"
			/>
			<SessionCard
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
				remainingTime="25 mins"
			/>
			<SessionCard
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
				remainingTime="25 mins"
			/>
			<SessionCard
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
				remainingTime="25 mins"
			/>
		</div>
	);
};

export default page;
