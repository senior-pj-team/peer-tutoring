"use client";
import SessionCard from "@/components/app/shared/session-card";
import { FiSearch, FiFilter, FiCalendar } from "react-icons/fi";
import { useState } from "react";

export default function BrowseSessionsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const mockSessions = [
		{
			id: 1,
			image: "/session-one.jpg",
			sessionName: "Next JS",
			courseCode: "10125",
			courseName: "Web Development",
			date: "2025-05-01",
			start_time: "09:00",
			end_time: "11:00",
			tutor_name: "John Doe",
			tutor_rating: 4.7,
			status: "open",
			enrollments: 20,
			page: "admin",
		},
		{
			id: 2,
			image: "/session-two.jpg",
			sessionName: "Intro to Physics",
			courseCode: "PHYS100",
			courseName: "Basic Mechanics",
			date: "2025-05-03",
			start_time: "13:00",
			end_time: "15:00",
			tutor_name: "Jane Smith",
			tutor_rating: 4.2,
			status: "closed",
			enrollments: 15,
			page: "admin",
		},
		{
			id: 3,
			image: "/session-three.jpg",
			sessionName: "Advanced Calculus",
			courseCode: "MATH301",
			courseName: "Differential Equations",
			date: "2025-05-05",
			start_time: "10:00",
			end_time: "12:00",
			tutor_name: "Robert Chen",
			tutor_rating: 4.9,
			status: "open",
			enrollments: 8,
			page: "admin",
		},
	];

	const filteredSessions = mockSessions.filter((session) => {
		const matchesSearch =
			session.sessionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			session.courseName.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus =
			statusFilter === "all" || session.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="p-6">
			{/* Page Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Browse Sessions
				</h1>
				<p className="text-gray-600">View and manage all tutoring sessions</p>
			</div>

			{/* Filters */}
			<div className="mb-6 flex flex-col sm:flex-row gap-4">
				<div className="relative flex-1">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<FiSearch className="text-gray-400" />
					</div>
					<input
						type="text"
						placeholder="Search sessions..."
						className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>

				<div className="flex items-center gap-2">
					<FiFilter className="text-gray-500" />
					<select
						className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}>
						<option value="all">All Statuses</option>
						<option value="open">Open</option>
						<option value="closed">Closed</option>
						<option value="archived">Archived</option>
					</select>
				</div>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
				<div className="bg-white p-4 rounded-lg border border-gray-200">
					<div className="text-sm text-gray-500">Total Sessions</div>
					<div className="text-2xl font-bold">{mockSessions.length}</div>
				</div>
				<div className="bg-white p-4 rounded-lg border border-gray-200">
					<div className="text-sm text-gray-500">Open Sessions</div>
					<div className="text-2xl font-bold text-green-600">
						{mockSessions.filter((s) => s.status === "open").length}
					</div>
				</div>
				<div className="bg-white p-4 rounded-lg border border-gray-200">
					<div className="text-sm text-gray-500">Total Enrollments</div>
					<div className="text-2xl font-bold">
						{mockSessions.reduce(
							(sum, session) => sum + session.enrollments,
							0,
						)}
					</div>
				</div>
			</div>

			{/* Sessions Grid */}
			{filteredSessions.length > 0 ? (
				<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
					{filteredSessions.map((session) => (
						<SessionCard key={session.id} {...session} />
					))}
				</div>
			) : (
				<div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
					<FiCalendar className="mx-auto text-gray-400 w-12 h-12 mb-4" />
					<h3 className="text-lg font-medium text-gray-900 mb-1">
						No sessions found
					</h3>
					<p className="text-gray-500">Try adjusting your search or filters</p>
				</div>
			)}
		</div>
	);
}
