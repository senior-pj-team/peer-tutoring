import React from "react";
import NotificationList from "@/components/app/features/notification/notification-list";
import { getNotificationByUser } from "@/data/queries/notification/get-notification-by-user";
import GeneralError from "@/components/app/shared/error";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { getQueryClient } from "@/utils/app/get-query-client";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";
import { getNotificationCount } from "@/data/queries/notification/get-notification-count";

async function fetchNotifications({
	supabase,
	pageParam,
	user_id,
	type,
}: {
	supabase: TSupabaseClient;
	pageParam: number;
	user_id: string;
	type: TNotificationType[];
}) {
	const data = await getNotificationByUser(supabase, {
		offset: pageParam,
		limit: 15,
		user_id,
		type,
	});
	if (!data) throw new Error("Error fetching");
	return data;
}

async function page() {
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

	const [warning_count] = await Promise.all([
		getNotificationCount(supabase, {
			user_id: user.user_id,
			type: ["tutor_warning"],
		}),
		queryClient.prefetchInfiniteQuery({
			queryKey: ["tutor_warning", user.user_id, ["tutor_warning"]],
			queryFn: ({ pageParam }) =>
				fetchNotifications({
					supabase,
					pageParam,
					user_id: user.user_id,
					type: ["tutor_warning"],
				}),
			initialPageParam: 0,
		}),
	]);
	if (!warning_count && warning_count !== 0) {
		return (
			<>
				<GeneralError />
			</>
		);
	}

	return (
		<div>
			<NotificationList
				user_id={user.user_id}
				type={["tutor_warning"]}
				q_key="tutor_warning"
				count={warning_count}
			/>
		</div>
	);
}

export default page;
