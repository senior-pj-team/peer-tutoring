import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "@/app/(auth)/actions";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";

export default function CustomSheet({
	user,
	noti_count,
}: {
	user: UserSession;
	noti_count?: number | null;
}) {
	async function handleSignOut() {
		const { error } = await signOut();
		if (error) {
			toast("Log out Error!");
		} else {
			redirect("/");
		}
	}
	return (
		<SheetContent className="w-[18rem] md:w-[32rem]" side="left">
			<SheetHeader className="p-0 pt-5 bg-blue-50">
				<SheetTitle></SheetTitle>
				<div className="py-4 px-3 flex gap-x-5">
					{user && (
						<>
							<div className="w-12 h-12 border-none rounded-full overflow-hidden flex-shrink-0">
								<Avatar>
									{user.profile_url && (
										<AvatarImage
											src={user.profile_url}
											width={56}
											height={56}
											alt="User Avatar"
										/>
									)}

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
				<hr />
			</SheetHeader>
			<div className="flex flex-col ">
				<div>
					<span className="pl-4 font-extrabold text-xs text-gray-700">
						Learning
					</span>
					<ContentItem content="Explore" url="/home/sessions?page=1" />
					<ContentItem
						content="My Sessions"
						url="/my-sessions/upcoming-sessions"
					/>
					<ContentItem
						content="WishList"
						url="/my-sessions/wishlist-sessions"
					/>
					{user.user_role === "student" && (
						<ContentItem content="Become a tutor" url="/become-tutor" />
					)}
					{(user.user_role === "tutor" || user.user_role === "admin") && (
						<ContentItem
							content="Go to tutor dashboard"
							url="/tutor-dashboard/sessions/upcoming-sessions"
						/>
					)}
				</div>

				<hr className="mb-2" />
				<div>
					<span className="pl-4 font-extrabold text-xs text-gray-700">
						Alert
					</span>
					<ContentItem
						content="Notification"
						url="/notification"
						content_count={noti_count ?? 0}
					/>
					<ContentItem content="Chat" url="/chat" />
				</div>

				<hr className="mb-2" />
				<div>
					<span className="pl-4 font-extrabold text-xs text-gray-700">
						Account
					</span>
					<ContentItem
						content="Profile Setting"
						url="/profile-setting/profile"
					/>
					<ContentItem content="Setup Payment" url="/profile-setting/payment" />
					<ContentItem content="Payment History" url="/payment-history" />
				</div>

				<hr className="mb-2" />

				<div
					className="flex justify-between items-center hover:bg-orange-50 hover:text-orange-400"
					onClick={handleSignOut}>
					<div className=" text-sm py-3 cursor-pointer">
						<div className="px-3">Sign out</div>
					</div>
				</div>
			</div>
		</SheetContent>
	);
}

function ContentItem({
	content,
	url,
	content_count,
}: {
	content: string;
	url: string;
	content_count?: number;
}) {
	return (
		<Link href={url}>
			<div className="flex justify-between items-center hover:bg-orange-50 hover:text-orange-400 me-10">
				<div className=" text-sm py-3 cursor-pointer">
					<div className="px-3">{content}</div>
				</div>

				{(content_count ?? 0) > 0 &&
					(content === "WishList" || content === "Notification") && (
						<span className=" p-3 bg-orange-500 text-white text-[0.5rem] rounded-full h-[0.25rem] w-[0.25rem] flex items-center justify-center mx-3">
							{content_count}
						</span>
					)}
			</div>
		</Link>
	);
}
