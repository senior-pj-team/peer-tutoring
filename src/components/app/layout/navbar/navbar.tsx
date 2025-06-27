"use client";

import { Heart, Bell, Search, AlignJustify } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import HoverCustomCard from "./hover-custom-card";
import SearchBar from "./search-bar";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import CustomSheet from "./custom-sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/utils/app/get-avatar-fallback";
import { useNotificationsNavBar } from "@/hooks/use-notifications";
import { useSupabase } from "@/hooks/use-supabase";
import { cn } from "@/lib/utils";
import { useStudentSessionJoin } from "@/hooks/use-student-session-join";

export default function Navbar({ user }: { user: UserSession | null }) {
	const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);
	const [showNavbar, setShowNavbar] = useState<boolean>(true);
	const lastScrollY = useRef(0);
	const supabase = useSupabase();
	const {
		data: notifications,
		isLoading: notifLoading,
		isError: notifError,
	} = useNotificationsNavBar(
		user?.user_id ?? "",
		["student", "tutor", "tutor_reminder"],
		!!user,
		supabase,
	);
	const { data: mySessions } = useStudentSessionJoin(
		user?.user_id ?? "",
		!!user,
		supabase,
	);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
				setShowNavbar(false);
			} else if (currentScrollY < lastScrollY.current) {
				setShowNavbar(true);
			}
			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);
	return (
		<div
			className={clsx(
				"min-h-[5rem] py-4 px-4 drop-shadow-sm bg-white  w-full z-50 fixed top-0 left-0 transition-transform duration-300",
				{
					"-translate-y-full": !showNavbar,
					"translate-y-0": showNavbar,
				},
			)}>
			<div className="flex items-center justify-between w-full">
				<div className="flex gap-x-5 justify-around w-full md:w-[8rem] lg:w-[12rem] items-center">
					<div className="md:hidden  flex items-center">
						<button
							onClick={() => setShowMobileSearch((prev) => !prev)}
							className="text-gray-700 hover:text-orange-400 bg-transparent">
							<Search size={22} />
						</button>
					</div>{" "}
					<Link href="/home">
						<div className="font-bold text-3xl cursor-pointer">Orion</div>
					</Link>
					{user ? (
						<div className="pt-2">
							<Sheet>
								<SheetTrigger>
									<AlignJustify size={22} className="lg:hidden" />
								</SheetTrigger>
								<CustomSheet user={user} noti_count={notifications?.length} />
							</Sheet>
						</div>
					) : (
						<Link href={"/login"}>
							<Button
								variant="outline"
								className="hover:bg-orange-500 hover:text-white md:hidden cursor-pointer">
								Sign In
							</Button>
						</Link>
					)}
					<div className="hidden lg:block">
						<Link href={"/home/sessions?page=1"}>
							<HoverCustomCard content="Explore" />
						</Link>
					</div>
				</div>
				<div className="flex-1 flex-shrink hidden md:block md:mx-6 ">
					<SearchBar />
				</div>

				{user ? (
					<div className="hidden lg:flex  items-center justify-around gap-x-2 ">
						{user.user_role === "student" && (
							<Link href="/become-tutor">
								<HoverCustomCard content="Become a tutor" />
							</Link>
						)}
						{(user.user_role === "tutor" || user.user_role === "admin") && (
							<Link href="/tutor-dashboard/sessions/upcoming-sessions">
								<HoverCustomCard content="Go to tutor dashboard" />
							</Link>
						)}

						<Link href="/my-sessions/upcoming-sessions">
							<HoverCustomCard content="MySessions" ss={mySessions} />
						</Link>
						<Link href="/my-sessions/wishlist-sessions">
							<HoverCustomCard content="WishList" icon={<Heart size="20" />} />
						</Link>
						<Link href="/notification">
							<HoverCustomCard
								content="Notification"
								icon={
									<div className=" hover:bg-orange-50 hover:text-orange-400 cursor-pointer border-none rounded-sm">
										<Bell
											size="20"
											className={cn(
												"relative",
												notifLoading ? "opacity-50" : "",
											)}
										/>
										{!notifError &&
											notifications &&
											notifications.length > 0 && (
												<span
													className={cn(
														"absolute p-3 top-0 right-0 bg-red-500 text-white text-xs rounded-full h-[0.25rem] w-[0.25rem] flex items-center justify-center",
														notifLoading ? "opacity-50" : "",
													)}>
													{notifications.length}
												</span>
											)}
									</div>
								}
								notifications={notifications!}
							/>
						</Link>
						<Link href="/profile-setting/profile">
							<HoverCustomCard
								content="Profile"
								notifications={notifications}
								user={user}
								icon={
									<div className="overflow-hidden  hover:bg-orange-50 hover:text-orange-400 cursor-pointer border-none rounded-full ">
										<Avatar>
											<AvatarImage
												src={user.profile_url ?? "/image.png"}
												width={56}
												height={56}
												alt="User Avatar"
											/>
											<AvatarFallback>
												{getAvatarFallback(user.full_name)}
											</AvatarFallback>
										</Avatar>
									</div>
								}
							/>
						</Link>
					</div>
				) : (
					<Link href={"/login"}>
						<Button
							variant="outline"
							className="hidden md:block cursor-pointer hover:bg-orange-500 hover:text-white">
							Sign In
						</Button>
					</Link>
				)}
			</div>
			<div
				className={clsx(
					"transition-all duration-200 ease-in-out md:hidden z-0",
					showMobileSearch ? "max-h-[5rem] py-2" : "max-h-0 py-0",
					!showMobileSearch ? "overflow-hidden" : "",
				)}>
				<SearchBar />
			</div>
		</div>
	);
}
