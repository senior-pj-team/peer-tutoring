"use client";

import { Notification } from "./notification";
import GeneralError from "../../shared/error";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { useSupabase } from "@/hooks/use-supabase";
import { Button } from "@/components/ui/button";
import { CheckCheckIcon } from "lucide-react";

const NotificationList = ({
	user_id,
	type,
	count,
	key,
}: {
	user_id: string;
	type: TNotificationType[];
	count: number;
	key: string;
}) => {
	const supabase = useSupabase();
	const { ref, inView } = useInView({});
	const {
		data,
		status,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isError,
		isFetching,
	} = useNotifications(key, user_id, type, count, supabase);

	useEffect(() => {
		if (hasNextPage && !isFetching) {
			if (inView) {
				fetchNextPage();
			}
		}
	}, [fetchNextPage, inView, hasNextPage, isFetching]);
	if (status === "pending")
		return (
			<div className="w-full flex pt-[7rem] h-screen justify-center">
				<div className="flex gap-3 ">
					<div className="h-3 w-3 bg-orange-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
					<div className="h-3 w-3 bg-orange-300 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
					<div className="h-3 w-3 bg-orange-300 rounded-full animate-bounce"></div>
				</div>
			</div>
		);
	if (!data && status === "error")
		return (
			<div>
				<GeneralError />
			</div>
		);
	return (
		<>
			<div className="pb-4 space-y-4">
				<div className="">
					<Button
						className="flex gap-x-1 items-center cursor-pointer "
						variant="outline">
						<CheckCheckIcon />
						Mark as all read
					</Button>
				</div>
				{data.pages.flat().length === 0 ? (
					<div className="text-center text-gray-400 mt-20">
						No notifications to show
					</div>
				) : (
					<ul className="space-y-3">
						{data.pages.flat().map((noti) => (
							<Notification key={noti!.id} noti={noti!} />
						))}
					</ul>
				)}

				{isError ? (
					<div className="text-center text-sm font-extrabold text-red-500 mt-4">
						Error fetching notifications
					</div>
				) : (
					<div
						className="flex justify-center text-center items-center mt-4"
						ref={ref}>
						{hasNextPage ? (
							<div>
								{isFetchingNextPage && (
									<div className="flex gap-3">
										<div className="h-2 w-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
										<div className="h-2 w-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
										<div className="h-2 w-2 bg-orange-400 rounded-full animate-bounce"></div>
									</div>
								)}
							</div>
						) : (
							<span className="text-sm font-extrabold text-gray-400">
								No more notifications
							</span>
						)}
					</div>
				)}
			</div>
		</>
	);
};

export default NotificationList;
