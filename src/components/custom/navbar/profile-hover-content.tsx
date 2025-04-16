import { HoverCardContent } from "@/components/ui/hover-card";
import Image from "next/image";

export default function ProfileHoverContent() {
	return (
		<HoverCardContent className="w-70 absolute -right-5">
			<div className="py-4 px-3 flex gap-x-5">
				<div className="w-12 h-12 border-none rounded-full overflow-hidden flex-shrink-0">
					<Image
						src="https://avatar.iran.liara.run/public"
						width={56}
						height={56}
						alt="User Avatar"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex flex-col  overflow-hidden">
					<div className="font-extrabold text-lg text-gray-800"> William</div>
					<div className="font-light text-xs max-w-full truncate text-gray-800">
						williamkhant4@gmail.com
					</div>
				</div>
			</div>
			<hr className="mb-2" />
			<div className="flex flex-col  my-2">
				<ContentItem content="My Sessions" />
				<ContentItem content="WishList" />
				<ContentItem content="Become a Tutor" />
				<hr />
				<ContentItem content="Notification" />
				<ContentItem content="Chat" />
				<hr />
				<ContentItem content="Profile Setting" />
				<ContentItem content="Setup Payment" />
				<ContentItem content="Payment History" />
				<hr />
				<ContentItem content="Log Out" />
			</div>
		</HoverCardContent>
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
