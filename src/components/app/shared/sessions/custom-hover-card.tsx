import { Heart } from "lucide-react";
import { HoverCardContent } from "@/components/ui/hover-card";
import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { format, formatDate, subHours } from "date-fns";

export function CustomHoverCard({
	content,
}: {
	content: TSessionsMatViewResultRow;
}) {
	const router = useRouter();
	const minus24h = format(
		subHours(content.start_time ?? "", 24),
		"dd MMMM yyyy",
	);

	return (
		<HoverCardContent
			className="w-80 drop-shadow-md py-4 px-5 bg-white hidden md:block"
			side="right"
			sideOffset={-30}>
			<div className="text-[0.65rem] text-ellipsis line-clamp-2 mb-2 ml-[0.2rem] font-bold text-red-500">
				Session will be closed on {minus24h}
			</div>
			<div className="flex flex-col mb-1">
				<span className="max-w-[full] font-bold text-lg line-clamp-2">
					{content.session_name ?? "no info"}
				</span>

				<div className="text-[0.65rem] font-bold text-gray-500 ml-[0.2rem] flex items-center space-x-1.5">
					<span className="text-gray-700 font-extrabold">
						{content.course_name ?? "no info"} |
					</span>
					<span className="text-gray-700 font-extrabold">
						{content.course_code ?? "no info"}
					</span>
				</div>
			</div>

			<div className="text-[0.6rem] font-extrabold text-gray-800 mb-2 ml-[0.2rem]">
				<span> {content.school ?? "no info"} ● </span>{" "}
				<span>{content.major ?? "no info"}</span>
			</div>
			<div className="text-[0.75rem] font-extrabold text-gray-900 mb-1 ml-[0.2rem]">
				Date:{" "}
				<span className="font-bold">
					{content.start_time
						? formatDate(content.start_time, "dd MMMM yyyy")
						: "N/A"}
				</span>
			</div>
			<div className="text-[0.75rem] font-bold text-gray-800 mb-2 ml-[0.2rem]">
				<span>
					From{" "}
					<span className="text-green-700 text-[0.75rem]">
						{content.start_time ? format(content.start_time, "hh:mm a") : "N/A"}
					</span>
				</span>{" "}
				<span>
					-{" "}
					<span className="text-green-700 text-[0.75rem]">
						{content.end_time ? format(content.end_time, "hh:mm a") : "N/A"}
					</span>
				</span>
			</div>

			<div className=" text-[0.75rem] font-extrabold text-gray-800 mb-1 ml-[0.2rem]">
				Description
			</div>
			<div className=" overflow-hidden text-[0.65rem] text-ellipsis line-clamp-6 mb-6 ml-[0.2rem]">
				{content.description ?? "no info"}
			</div>

			<div className="flex w-full justify-end gap-5 items-center">
				<Button
					onClick={() => {
						router.push(`/home/session/${content.session_id}}`);
					}}
					variant="outline"
					className="border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 hover:text-orange-700 hover:border-orange-400 hover:ring-2 hover:ring-orange-500  transition-all duration-200 cursor-pointer">
					Enroll Now
				</Button>
				<Heart
					size={40}
					className="w-10 h-10 p-2 border border-orange-500 rounded-full text-orange-500 hover:text-orange-600 hover:bg-orange-100 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"></Heart>
			</div>
			<RadixHoverCard.Arrow className="fill-white w-4 h-6 drop-shadow-md" />
		</HoverCardContent>
	);
}
