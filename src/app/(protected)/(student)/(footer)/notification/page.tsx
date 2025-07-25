import NotificationList from "@/components/app/features/notification/notification-list";
import GeneralError from "@/components/app/shared/error";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNotificationCount } from "@/data/queries/notification/get-notification-count";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { fetchNotifications } from "@/utils/app/fetch-notifications";
import { getQueryClient } from "@/utils/app/get-query-client";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";
import { TabsContent } from "@radix-ui/react-tabs";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import React from "react";

export default async function page() {
	const queryClient = getQueryClient();
	const supabase = await createClient();

	const user = await getUserSession();
	if (!user) {
		return (
			<>
				<GeneralError />
			</>
		);
	}

	const { user_id } = user;

	const user_data = await getUserById(supabase, user_id);
	if (!user_data) {
		return (
			<>
				<GeneralError />
			</>
		);
	}

	const [student_noti_count, tutor_noti_count] = await Promise.all([
		getNotificationCount(supabase, {
			user_id,
			type: ["student"],
		}),
		getNotificationCount(supabase, {
			user_id,
			type: ["tutor", "tutor_reminder"],
		}),
	]);
	if (
		(!student_noti_count && student_noti_count !== 0) ||
		(!tutor_noti_count && tutor_noti_count !== 0)
	) {
		return (
			<>
				<GeneralError />
			</>
		);
	}
	await Promise.all([
		queryClient.prefetchInfiniteQuery({
			queryKey: ["student_notifications", user_id, ["student"]],
			queryFn: ({ pageParam }) =>
				fetchNotifications({
					supabase,
					pageParam,
					user_id,
					limit: 15,
					type: ["student"],
				}),
			initialPageParam: 0,
		}),

		queryClient.prefetchInfiniteQuery({
			queryKey: ["tutor_notifications", user_id, ["tutor", "tutor_reminder"]],
			queryFn: ({ pageParam }) =>
				fetchNotifications({
					supabase,
					pageParam,
					limit: 15,
					user_id,
					type: ["tutor", "tutor_reminder"],
				}),
			initialPageParam: 0,
		}),
	]);
	return (
		<div>
			<Tabs defaultValue="student">
				{(user_data.role === "tutor" || user_data.role === "admin") && (
					<TabsList className="grid w-full grid-cols-2 max-w-md mb-4 bg-orange-100 rounded-md p-1">
						<TabsTrigger
							value="student"
							className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700 cursor-pointer">
							Student
						</TabsTrigger>
						<TabsTrigger
							value="tutor"
							className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700 cursor-pointer">
							Tutor
						</TabsTrigger>
					</TabsList>
				)}

				<TabsContent value="student">
					<HydrationBoundary state={dehydrate(queryClient)}>
						<NotificationList
							user_id={user_id}
							type={["student"]}
							q_key="student_notifications"
							count={student_noti_count}
						/>
					</HydrationBoundary>
				</TabsContent>
				<TabsContent value="tutor">
					<HydrationBoundary state={dehydrate(queryClient)}>
						<NotificationList
							user_id={user_id}
							type={["tutor", "tutor_reminder"]}
							q_key="tutor_notifications"
							count={tutor_noti_count}
						/>
					</HydrationBoundary>
				</TabsContent>
			</Tabs>
		</div>
	);
}
