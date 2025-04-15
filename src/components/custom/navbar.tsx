import { Heart, Bell } from "lucide-react";
import Image from "next/image";
import HoverCustomCard from "./hover-custom-card";
import SearchBar from "./search-bar";

export default function Navbar() {
	return (
		<div className="min-h-[4rem] py-4 px-4 drop-shadow-sm bg-white">
			<div className="flex items-center justify-between w-full">
				<div className="flex gap-x-5 items-center justify-around">
					<div className="font-bold text-3xl">Orion</div>
					<HoverCustomCard content="Explore" />
				</div>
				<div className="flex-1 flex-shrink">
					<SearchBar />
				</div>

				<div className="hidden lg:flex  items-center justify-around gap-x-2">
					<HoverCustomCard content="Become a tutor" />
					<HoverCustomCard content="MySessions" />
					<HoverCustomCard content="WishList" icon={<Heart size="20" />} />
					<HoverCustomCard
						content="Notification"
						icon={
							<div className=" hover:bg-orange-50 hover:text-orange-400 cursor-pointer border-none rounded-sm">
								<Bell size="20 " className="relative" />
								<span className="absolute p-3 top-0 right-0 bg-red-500 text-white text-xs rounded-full h-[0.25rem] w-[0.25rem] flex items-center justify-center">
									3
								</span>
							</div>
						}
					/>
					<HoverCustomCard
						content="Profile"
						icon={
							<div className="overflow-hidden  hover:bg-orange-50 hover:text-orange-400 cursor-pointer border-none rounded-full ">
								<Image
									src="https://avatar.iran.liara.run/public"
									width={30}
									height={30}
									alt="User Avatar"
									className="w-full h-full object-cover "
								/>
							</div>
						}
					/>
				</div>
			</div>
		</div>
	);
}
