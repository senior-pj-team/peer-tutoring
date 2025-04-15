import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import ExploreHoverContent from "./explore-hover-content";
import SessionHoverContent from "./session-hover-content";
import NotiHoverContent from "./noti-hover-content";
import ProfileHoverContent from "./profile-hover-content";

export default function HoverCustomCard({
	content,
	icon,
}: {
	content: string;
	icon?: React.ReactNode;
}) {
	return (
		<HoverCard openDelay={0} closeDelay={0}>
			<HoverCardTrigger asChild className="relative">
				<div className="text-sm p-3  hover:bg-orange-50 hover:text-orange-400 cursor-pointer border-none rounded-sm">
					{icon ? icon : content}
				</div>
			</HoverCardTrigger>
			{content === "Explore" && <ExploreHoverContent />}
			{content === "MySessions" && <SessionHoverContent content="MySessions" />}
			{content === "WishList" && <SessionHoverContent content="WishList" />}
			{content === "Notification" && <NotiHoverContent />}
			{content === "Profile" && <ProfileHoverContent />}
		</HoverCard>
	);
}
