import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import ExploreHoverContent from "./explore-hover-content";
import SessionHoverContent from "./session-hover-content";
import NotiHoverContent from "./noti-hover-content";
import ProfileHoverContent from "./profile-hover-content";

export default function HoverCustomCard({
	content,
	icon,
	user,
	notifications,
	ss,
}: {
	content: string;
	icon?: React.ReactNode;
	user?: UserSession;
	notifications?: TNotificationResult[];
	ss?: TStudentSessionViewResult[];
}) {
	return (
		<HoverCard openDelay={0} closeDelay={0}>
			<HoverCardTrigger asChild className="relative">
				<div className="text-sm p-3  hover:bg-orange-50 hover:text-orange-400 cursor-pointer border-none rounded-sm">
					{icon ? icon : content}
				</div>
			</HoverCardTrigger>
			{content === "Explore" && <ExploreHoverContent />}
			{content === "MySessions" && ss && <SessionHoverContent ss={ss} />}
			{/* {content === "WishList" && <SessionHoverContent content="WishList" />} */}
			{content === "Notification" && (
				<NotiHoverContent notifications={notifications ?? []} />
			)}
			{content === "Profile" && user && (
				<ProfileHoverContent user={user} noti_count={notifications?.length} />
			)}
		</HoverCard>
	);
}
