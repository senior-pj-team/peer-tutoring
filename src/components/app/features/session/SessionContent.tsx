import React from "react";
import Expandable from "@/components/app/shared/expandable-text";

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
	} = data;

	const remaining_slots = (max_students ?? 0) - (enrolled_students ?? 0);
	return (
		<div>
			<div className="max-w-[53rem] p-6 bg-white space-y-6">
				<div>
					<h2 className="text-lg font-semibold mb-1">Description</h2>
					<Expandable
						max={200}
						text={description?? "No-description"}
						className="mt-5 text-sm"
					/>
				</div>
				<div>
					<h2 className="text-lg font-semibold mb-1">Requirements</h2>
					<Expandable
						max={200}
						text={requirement?? "No requirement"}
						className="mt-5 text-sm"
					/>
				</div>
				<div>
					<h2 className="text-lg font-semibold mb-1">Location</h2>
					<Expandable
						max={200}
						text={location?? "No location specified"}
						className="mt-5 text-sm"
					/>
				</div>
				{/* date time */}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 mt-10">
					<div>
						<span className="font-semibold">Date:</span> {date}
					</div>
					<div>
						<span className="font-semibold">Start Time: </span>
						<span className="text-green-700 text-[0.8rem]">
							{start_time?? "NA"}
						</span>
					</div>
					<div>
						<span className="font-semibold">End Time: </span>
						<span className="text-green-700 text-[0.8rem]">
							{end_time?? 'NA'}
						</span>
					</div>
				</div>
				{/* max student, enrolled students, remaining slots*/}
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700 mt-5">
					<div>
						<span className="font-semibold">Max Students: </span>
						{max_students?? 'NA'}
					</div>
					<div>
						<span className="font-semibold">Enrolled: </span>
						{enrolled_students?? 0}
					</div>
					<div>
						<span className="font-semibold">Remaining Slots: </span>
						{remaining_slots}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SessionContent;
