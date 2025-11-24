'use client'
import React from "react";
import Expandable from "@/components/app/shared/expandable-text";
import {
	CalendarDays,
	ClockArrowDown,
	ClockArrowUp,
	User2Icon,
	UserMinus2Icon,
	UserPlus2Icon,
} from "lucide-react";
import { Json } from "@/lib/database.types";
import LearningMaterials from "../../shared/sessions/learning-material";
import { format } from "date-fns";

type TSessionContentData = {
	description: string | null;
	requirement: string | null;
	location: string | null;
	date: string | null;
	start_time: string | null;
	end_time: string | null;
	max_students: number | null;
	enrolled_students: number;
	learning_materials: Json
};

const SessionContent = ({ data }: { data: TSessionContentData }) => {
	const {
		description,
		requirement,
		location,
		date,
		start_time,
		end_time,
		max_students,
		enrolled_students,
		learning_materials
	} = data;

	const remaining_slots = (max_students ?? 0) - (enrolled_students ?? 0);

	return (
		<div>
			<div className="max-w-[53rem] p-6 bg-white space-y-6">
				<div>
					<h2 className="text-lg font-semibold mb-1">🗒️ Description</h2>
					<Expandable
						max={200}
						text={description ?? "No description"}
						className="mt-3 text-sm text-gray-600 ml-1"
					/>
				</div>
				<div>
					<h2 className="text-lg font-semibold mb-1">💼 Requirements </h2>
					<Expandable
						max={200}
						text={requirement ?? "No requirement"}
						className="mt-3 text-sm text-gray-600 ml-1"
					/>
				</div>
				{
					typeof(learning_materials) == "string" && (
						<div>
					<h2 className="text-lg font-semibold mb-1">📚 Learning Materials</h2>
					<LearningMaterials fields={JSON.parse(learning_materials)} isDisable={false} />
				</div>
						
					)
				}
				<div>
					<h2 className="text-lg font-semibold mb-1">📍 Location</h2>
					<Expandable
						max={200}
						text={location ?? "No location specified"}
						className="mt-2 text-sm text-gray-600 ml-1"
					/>
				</div>
				{/* date time */}
				<h2 className="text-lg font-semibold mb-1">🚀 Session Details</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 mt-4">
					<div className="flex items-center gap-1">
						<CalendarDays size={18} />
						<div className="space-x-1">
							<span className="font-semibold">Date:</span>
							<span className=" text-[0.85rem] font-extrabold">{date}</span>
						</div>
					</div>
					<div className="flex items-center gap-1">
						<ClockArrowUp size={18} />
						<div className="space-x-1">
							<span className="font-semibold">Start Time:</span>
							<span className="text-green-700 text-[0.85rem] font-extrabold">
								{start_time ? format(start_time, "hh:mm a")?? "unknown" : "N/A"}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-1">
						<ClockArrowDown size={18} />
						<div className="space-x-1">
							<span className="font-semibold">End Time:</span>
							<span className="text-green-700 text-[0.85rem] font-extrabold">
								{end_time ? format(end_time, "hh:mm a")?? "unknown" : "N/A"}
							</span>
						</div>
					</div>
				</div>
				{/* max student, enrolled students, remaining slots*/}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 mt-5">
					<div className="flex items-center gap-1">
						<User2Icon size={18} fill="" />
						<div className="space-x-1">
							<span className="font-semibold">Max Students:</span>
							<span className="text-[0.85rem] font-extrabold">
								{max_students ?? "N/A"}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-1">
						<UserMinus2Icon size={18} />
						<div className="space-x-1">
							<span className="font-semibold">Enrolled:</span>
							<span className="text-[0.85rem] font-extrabold">
								{enrolled_students ?? 0}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-1">
						<UserPlus2Icon size={18} />
						<div className="space-x-1">
							<span className="font-semibold">Remaining Seats:</span>
							<span className=" text-[0.85rem] font-extrabold">
								{remaining_slots}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SessionContent;
