"use client";

import { Heart, Bell, Search, AlignJustify } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import Image from "next/image";
import HoverCustomCard from "./hover-custom-card";
import SearchBar from "./search-bar";
import { useState, useEffect, useLayoutEffect } from "react";
import clsx from "clsx";
import CustomSheet from "./custom-sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
	const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);
	const [showNavbar, setShowNavbar] = useState<boolean>(true);
	const [lastScrollY, setLastScrollY] = useState<number>(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				setShowNavbar(false);
			} else {
				setShowNavbar(true);
			}
			setLastScrollY(currentScrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);

	useEffect(() => {
		const isAuthenticated = async () => {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setIsLoggedIn(!!user);
		};
		isAuthenticated();
	}, [isLoggedIn]);
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
					{isLoggedIn === null ? (
						<div className=" lg:hidden  items-center justify-around gap-x-2 ">
							<Skeleton className="h-6 w-[80px] md:w-[40px]" />
						</div>
					) : isLoggedIn ? (
						<div className="pt-2">
							<Sheet>
								<SheetTrigger>
									<AlignJustify size={22} className="lg:hidden" />
								</SheetTrigger>
								<CustomSheet />
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

				{isLoggedIn === null ? (
					<div className="hidden lg:flex  items-center justify-around gap-x-2 ">
						<Skeleton className="h-6 w-[80px]" />
						<Skeleton className="h-6 w-[50px]" />
						<Skeleton className="h-6 w-[50px]" />
						<Skeleton className="h-6 w-[50px]" />
					</div>
				) : isLoggedIn ? (
					<div className="hidden lg:flex  items-center justify-around gap-x-2 ">
						<HoverCustomCard content="Become a tutor" />
						<Link href="/my-sessions/upcoming-sessions">
							<HoverCustomCard content="MySessions" />
						</Link>
						<Link href="/my-sessions/wishlist-sessions">
							<HoverCustomCard content="WishList" icon={<Heart size="20" />} />
						</Link>
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
					"transition-all duration-300 ease-in-out overflow-hidden md:hidden",
					showMobileSearch ? "max-h-[5rem] py-2" : "max-h-0 py-0",
				)}>
				<SearchBar />
			</div>
		</div>
	);
}
