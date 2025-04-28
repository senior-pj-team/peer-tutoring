import { HoverCardContent } from "@/components/ui/hover-card";
import { BookOpen, MessageSquare } from "lucide-react";
import Link from "next/link";

const notifications = [
	{
		id: 1,
		text: "Web Development starts tomorrow.",
		icon: <BookOpen className="w-4 h-4 text-orange-400" />,
		read: false,
	},
	{
		id: 2,
		text: "Database class finished — your tutor would appreciate a review.",
		icon: <MessageSquare className="w-4 h-4 text-orange-400" />,
		read: true,
	},
	// Add more if needed
];

export default function NotiHoverContent() {
	return (
		<HoverCardContent className="w-80 py-2 absolute -right-15">
			<div className="font-bold text-lg px-2 mb-4 text-gray-800">
				Notification
			</div>
			{notifications.length === 0 ? (
				<div className="px-4 py-6 text-sm text-gray-500 text-center">
					No new notifications.
				</div>
			) : (
				<div className="flex flex-col divide-y divide-gray-100">
					<Link href={"/notification"}>
						{notifications.map((note) => (
							<div
								key={note.id}
								className="flex items-start gap-3 px-4 py-2 hover:bg-orange-50 transition-colors duration-150 cursor-pointer">
								<div className="mt-0.5">{note.icon}</div>
								<div className="flex-1 text-sm text-gray-700 truncate">
									{note.text}
								</div>
								{!note.read && (
									<span className="mt-1 h-2 w-2 rounded-full bg-orange-400" />
								)}
							</div>
						))}
					</Link>
				</div>
			)}
		</HoverCardContent>
	);
}
