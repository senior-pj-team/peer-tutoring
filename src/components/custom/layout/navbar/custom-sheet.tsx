import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { redirect } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { signOut } from "@/app/(auth)/actions";
import { useAuth } from "@/components/providers/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";

export default function CustomSheet() {
	const { user, setUser, loading } = useAuth();
	async function handleSignOut() {
		const { error } = await signOut();
		if (error) {
			toast("Log out Error!");
		} else {
			setUser(null);
			redirect("/login");
		}
	}
	return (
		<SheetContent className="w-[18rem] md:w-[32rem]" side="left">
			<SheetHeader className="p-0 pt-5 bg-blue-50">
				<SheetTitle></SheetTitle>
				<div className="py-4 px-3 flex gap-x-5">
					{!user && loading && (
						<div>
							<div className="flex items-center space-x-4">
								<Skeleton className="h-12 w-12 rounded-full" />
								<div className="space-y-2">
									<Skeleton className="h-4 w-[250px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
						</div>
					)}
					{user && !loading && (
						<>
							<div className="w-12 h-12 border-none rounded-full overflow-hidden flex-shrink-0">
								<Image
									src="https://avatar.iran.liara.run/public"
									width={56}
									height={56}
									alt="User Avatar"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex flex-col overflow-hidden">
								<div className="font-extrabold text-lg text-gray-800">
									{user.user_metadata.full_name}
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
					<ContentItem content="My Sessions" />
					<ContentItem content="WishList" />
					<ContentItem content="Become a Tutor" />
				</div>

				<hr className="mb-2" />
				<div>
					<span className="pl-4 font-extrabold text-xs text-gray-700">
						Alert
					</span>
					<ContentItem content="Notification" />
					<ContentItem content="Chat" />
				</div>

				<hr className="mb-2" />
				<div>
					<span className="pl-4 font-extrabold text-xs text-gray-700">
						Account
					</span>
					<ContentItem content="Profile Setting" />
					<ContentItem content="Setup Payment" />
					<ContentItem content="Payment History" />
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

function ContentItem({ content }: { content: string }) {
	return (
		<div className="flex justify-between items-center hover:bg-orange-50 hover:text-orange-400">
			<div className=" text-sm py-3 cursor-pointer">
				<div className="px-3">{content}</div>
			</div>

			{content === "WishList" && (
				<span className=" p-3 bg-orange-500 text-white text-xs rounded-full h-[0.25rem] w-[0.25rem] flex items-center justify-center mx-3">
					1
				</span>
			)}
		</div>
	);
}
