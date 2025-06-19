import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTimeAgo } from "@/utils/app/get-time-ago";
import { Trash2 } from "lucide-react";

export function Notification({
	noti,
	deleteNoti,
}: {
	noti: TNotificationResult;
	deleteNoti: () => void;
}) {
	return (
		<li
			className={cn(
				"flex items-start justify-between  border  p-4 rounded-lg shadow-sm",
				noti.type === "tutor_warning"
					? "bg-red-50 border-red-200 border-3"
					: noti.status === "new"
					? "bg-orange-50 border-orange-200 border-3"
					: " bg-slate-100 border-gray-200 border-3",
			)}>
			<div className="flex flex-col gap-1.5 w-full">
				<span className="text-gray-700 text-lg font-bold">{noti.title}</span>
				<span className="text-gray-600 text-sm">{noti.body}</span>

				<span className={cn("text-xs text-orange-500 mt-1")}>
					{
						<span className="text-xs text-gray-500">
							{getTimeAgo(noti.created_at)}
						</span>
					}
				</span>
			</div>
			{noti.type !== "tutor_warning" && (
				<Button
					onClick={deleteNoti}
					variant="ghost"
					className="ml-2 cursor-pointer transition hover:bg-red-100 "
					title="Delete">
					<Trash2 className=" text-red-500" size={12} />
				</Button>
			)}
		</li>
	);
}
