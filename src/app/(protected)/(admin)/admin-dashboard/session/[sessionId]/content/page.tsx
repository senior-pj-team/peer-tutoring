"use client";
import React from "react";
import Expandable from "@/components/app/shared/expandable-text";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import AdminTransfer from "@/components/app/features/admin/admin-transfer";

const SessionDetailPage = () => {
	const sessionData = {
		sessionName: "Advanced React Workshop",
		courseCode: "110125",
		courseName: "Web Application Development",
		school: "Applied Digital Technology",
		major: "Computer Engineering",
		description:
			"This session will deep dive into advanced React concepts like hooks, context, and performance optimization.",
		requirements:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi reiciendis laborum iure...",
		location: "Mae Fah Laung university D1 Library",
		date: "April 20, 2025",
		startTime: "10:00 AM",
		endTime: "12:00 PM",
		maxStudents: 10,
		enrolledStudents: 3,
		tutor: {
			name: "John Doe",
			image: "/tutor.jpg",
			rating: 4,
			maxRating: 5,
			bankDetails: {
				accountName: "John Doe",
				accountNumber: "1234567890",
				bankName: "XYZ Bank",
			},
		},
		status: "COMPLETED",
		bannerImage: "/session-frame.jpg",
		amount: 100,
		isTransferred: false, // TODO: Replace with real backend field
	};

	const {
		sessionName,
		courseCode,
		courseName,
		school,
		major,
		description,
		requirements,
		location,
		date,
		startTime,
		endTime,
		maxStudents,
		enrolledStudents,
		tutor,
		status,
		bannerImage,
		amount,
		isTransferred,
	} = sessionData;

	const isCompleted = status === "COMPLETED";
	const remainingSlots = maxStudents - enrolledStudents;

	return (
		<div className="max-w-5xl mx-auto py-10 space-y-10">
			{/* Banner */}
			<div className="relative h-64 w-full rounded-lg overflow-hidden">
				<Image
					src={bannerImage}
					alt="Session banner"
					layout="fill"
					objectFit="cover"
					className="object-center"
				/>
			</div>

			{/* Header Info */}
			<section className="space-y-2">
				<h1 className="text-3xl font-bold">{sessionName}</h1>
				<p className="text-gray-600 text-sm">
					{courseCode} | {courseName} • {school} ● {major}
				</p>
				<div className="flex items-center gap-4 mt-2">
					<span
						className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
							isCompleted
								? "bg-purple-100 text-purple-800"
								: "bg-green-100 text-green-800"
						}`}>
						{status}
					</span>

					{isCompleted && !isTransferred ? (
						<AdminTransfer
							type="tutor"
							amount={amount}
							name={tutor.name}
							bankInfo={{
								bankName: tutor.bankDetails.bankName,
								accountName: tutor.bankDetails.accountName,
								accountNumber: tutor.bankDetails.accountNumber,
							}}
							onConfirm={() => {
								console.log("Tutor transfer confirmed");
							}}
						/>
					) : isTransferred ? (
						<span className="text-sm text-green-600 font-medium">
							Already Transferred
						</span>
					) : (
						<span className="text-sm text-gray-500">Cannot transfer yet</span>
					)}
				</div>
			</section>

			{/* Tutor Info */}
			<section className="flex items-center gap-4">
				<div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow">
					<Image
						src={tutor.image}
						alt={tutor.name}
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<div>
					<h3 className="font-medium">{tutor.name}</h3>
					<div className="flex items-center text-sm text-gray-600">
						{[...Array(tutor.maxRating)].map((_, i) => (
							<FiStar
								key={i}
								className={`w-4 h-4 ${
									i < tutor.rating
										? "text-yellow-400 fill-yellow-400"
										: "text-gray-300"
								}`}
							/>
						))}
						<span className="ml-2">
							{tutor.rating} / {tutor.maxRating}
						</span>
					</div>
				</div>
			</section>

			{/* Description */}
			<section>
				<h2 className="text-xl font-semibold mb-2">Description</h2>
				<p className="text-gray-700">{description}</p>
			</section>

			{/* Requirements */}
			<section>
				<h2 className="text-xl font-semibold mb-2">Requirements</h2>
				<Expandable max={200} text={requirements} className="text-gray-700" />
			</section>

			{/* Location */}
			<section>
				<h2 className="text-xl font-semibold mb-2">Location</h2>
				<p className="text-gray-700">{location}</p>
			</section>

			{/* Time & Capacity */}
			<section>
				<h2 className="text-xl font-semibold mb-4">Session Details</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
					<div>
						<span className="font-medium">Date:</span> {date}
					</div>
					<div>
						<span className="font-medium">Start Time:</span> {startTime}
					</div>
					<div>
						<span className="font-medium">End Time:</span> {endTime}
					</div>
					<div>
						<span className="font-medium">Max Students:</span> {maxStudents}
					</div>
					<div>
						<span className="font-medium">Enrolled:</span> {enrolledStudents}
					</div>
					<div>
						<span className="font-medium">Remaining Slots:</span>{" "}
						{remainingSlots}
					</div>
				</div>
			</section>
		</div>
	);
};

export default SessionDetailPage;
