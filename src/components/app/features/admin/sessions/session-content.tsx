import {
	CalendarDays,
	ClockArrowDown,
	ClockArrowUp,
	User2Icon,
	UserMinus2Icon,
	UserPlus2Icon,
} from "lucide-react";
import Expandable from "../../../shared/expandable-text";
import { format, formatDate } from "date-fns";

type Params = {
	content: {
		description: string | null;
		requirement: string | null;
		location: string | null;
		start_time: string | null;
		end_time: string | null;
		max_students: number | null;
		enrollment_count: number;
		service_fee: number | null;
		price: number | null;
	};
};

export function SessionContent({
	content: {
		description,
		requirement,
		location,
		start_time,
		end_time,
		max_students,
		enrollment_count,
		service_fee,
		price,
	},
}: Params) {
	return (
		<div className="py-6 space-y-10">
			<section>
				<h2 className="text-xl font-semibold mb-2">🗒️ Description</h2>
				<p className="text-gray-700">{description ?? "no info"}</p>
			</section>
			<section>
				<h2 className="text-xl font-semibold mb-2">💼 Requirements</h2>
				<Expandable
					max={200}
					text={requirement ?? "no info"}
					className="text-gray-700"
				/>
			</section>

			{/* Location */}
			<section>
				<h2 className="text-xl font-semibold mb-2">📍 Location</h2>
				<p className="text-gray-700">{location}</p>
			</section>

			{/* Time & Capacity */}
			<section>
				<h2 className="text-xl font-semibold mb-4">🚀 Session Details</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
					<div className="flex items-center gap-1">
						<CalendarDays size={18} />
						<div className="space-x-1">
							<span className="font-semibold">Date:</span>
							<span className=" text-[0.85rem] font-extrabold">
								{formatDate(start_time ?? "", "dd MMMM yyyy")}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-1">
						<ClockArrowUp size={18} />
						<div className="space-x-1">
							<span className="font-semibold">Start Time:</span>
							<span className="text-green-700 text-[0.85rem] font-extrabold">
								{start_time ? format(start_time, "hh:mm a") : "Unknown"}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-1">
						<ClockArrowDown size={18} />
						<div className="space-x-1">
							<span className="font-semibold">End Time:</span>
							<span className="text-green-700 text-[0.85rem] font-extrabold">
								{end_time ? format(end_time, "hh:mm a") : "Unknown"}
							</span>
						</div>
					</div>
				</div>
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
								{enrollment_count ?? 0}
							</span>
						</div>
					</div>
					<div className="flex items-center gap-1">
						<UserPlus2Icon size={18} />
						<div className="space-x-1">
							<span className="font-semibold">Remaining Seats:</span>
							<span className=" text-[0.85rem] font-extrabold">
								{(max_students ?? 0) - enrollment_count}
							</span>
						</div>
					</div>
				</div>
			</section>
			<section>
				<h2 className="text-xl font-semibold mb-4">💵 Price Details</h2>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-700">
					<div className="flex items-center gap-1">
						<div className="space-x-1">
							<span className="font-semibold">Service Fee:</span>
							<span className="text-green-700 text-[0.85rem] font-extrabold">
								{service_fee}฿
							</span>
						</div>
					</div>
					<div className="flex items-center gap-1">
						<div className="space-x-1">
							<span className="font-semibold">Price per student by tutor:</span>
							<span className="text-green-700 text-[0.85rem] font-extrabold">
								{price}฿
							</span>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
