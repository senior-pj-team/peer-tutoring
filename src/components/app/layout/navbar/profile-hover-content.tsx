import { signOut } from "@/app/(auth)/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCardContent } from "@/components/ui/hover-card";
import { useSupabase } from "@/hooks/use-supabase";
import { useUnreadMessageCount } from "@/hooks/use-unread-message-count";

import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function ProfileHoverContent({
	user,
	noti_count,
}: {
	user: UserSession | null;
	noti_count?: number;
}) {
	async function handleSignOut() {
		const { error } = await signOut();
		if (error) {
			toast("Log out Error!");
		} else {
			redirect("/home");
		}
	}
	const supabase= useSupabase();
	const {
			data: unreadMessages,
	}= useUnreadMessageCount(user?.user_id ?? "", !!user, supabase)
	return (
		<HoverCardContent className="w-70 absolute -right-5">
			<div className="py-4 px-3 flex gap-x-5">
				{user && (
					<>
						<div className="w-12 h-12 border-none rounded-full overflow-hidden flex-shrink-0">
							<Avatar>
								<AvatarImage
									src={user.profile_url ?? ""}
									width={56}
									height={56}
									alt="User Avatar"
								/>
								<AvatarFallback>
									{getAvatarFallback(user.full_name)}
								</AvatarFallback>
							</Avatar>
						</div>
						<div className="flex flex-col overflow-hidden">
							<div className="font-extrabold text-lg text-gray-800">
								{user.full_name}
							</div>
							<div className="font-light text-xs max-w-full truncate text-gray-800">
								{user.email}
							</div>
						</div>
					</>
				)}
			</div>

			<hr className="mb-2" />

			<div className="flex flex-col my-2">
				<Link href="/my-sessions/upcoming-sessions">
					<ContentItem content="My Sessions" />
				</Link>
				<Link href="/my-sessions/wishlist-sessions">
					<ContentItem content="WishList" />
				</Link>
				<Link href="/become-tutor">
					<ContentItem content="Become a Tutor" />
				</Link>
				<hr />
				<Link href="/notification">
					<ContentItem content="Notification" content_count={noti_count} />
				</Link>
				<Link href="/chat">
					<ContentItem content="Chat" content_count={unreadMessages?? 0}/>
				</Link>
				<hr />
				<Link href="/profile-setting/profile">
					<ContentItem content="Profile Setting" />
				</Link>
				<Link href="/profile-setting/payment">
					<ContentItem content="Setup Payment" />
				</Link>
				<Link href="/payment-history">
					<ContentItem content="Payment History" />
				</Link>
				<hr />
				<div
					className="flex justify-between items-center hover:bg-orange-50 hover:text-orange-400 text-sm py-3 cursor-pointer w-full px-3"
					onClick={handleSignOut}>
					<div>Sign out</div>
				</div>
			</div>
		</HoverCardContent>
	);
}

function ContentItem({
	content,
	content_count,
}: {
	content: string;
	content_count?: number;
}) {
	return (
		<div className="flex justify-between items-center hover:bg-orange-50 hover:text-orange-400 text-sm py-3 cursor-pointer w-full px-3">
			<div>{content}</div>

			{(content_count ?? 0) > 0 &&
				(content === "WishList" || content === "Notification" || content === "Chat") && (
					<span className=" p-3 bg-orange-500 text-white text-xs rounded-full h-[0.25rem] w-[0.25rem] flex items-center justify-center mx-3">
						{content_count}
					</span>
				)}
		</div>
	);
}
