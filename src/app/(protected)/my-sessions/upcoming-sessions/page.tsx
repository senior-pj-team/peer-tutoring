<<<<<<< HEAD
import React from 'react'
import SessionCards from '@/components/custom/session/session-cards'


const page = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='upcoming'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='upcoming'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='upcoming'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='upcoming'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='upcoming'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='upcoming'/>
      <SessionCards sessionName="Example session name" courseCode="10125" courseName="Web development" cardType='upcoming'/>
    </div>
  )
}
=======
import React from "react";
import SessionCards from "@/components/custom/session/session-cards";

const page = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			<SessionCards
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
			/>
			<SessionCards
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
			/>
			<SessionCards
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
			/>
			<SessionCards
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
			/>
			<SessionCards
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
			/>
			<SessionCards
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
			/>
			<SessionCards
				sessionName="Example session name"
				courseCode="10125"
				courseName="Web development"
				cardType="upcoming"
			/>
		</div>
	);
};
>>>>>>> 6f75e8e (homepage tutor section finished)

export default page;
