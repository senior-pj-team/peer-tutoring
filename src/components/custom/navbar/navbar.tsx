"use client";

import { Heart, Bell, Search, AlignJustify } from "lucide-react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import Image from "next/image";
import HoverCustomCard from "./hover-custom-card";
import SearchBar from "./search-bar";
import { useState, useEffect } from "react";
import clsx from "clsx";
import CustomSheet from "./custom-sheet";
import Link from "next/link";

export default function Navbar() {
	const [showMobileSearch, setShowMobileSearch] = useState(false);
	const [showNavbar, setShowNavbar] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

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
							className="text-gray-700 hover:text-orange-400">
							<Search size={22} />
						</button>
					</div>
					<Link href="/">
						<div className="font-bold text-3xl cursor-pointer">Orion</div>
					</Link>

					<div>
						<Sheet>
							<SheetTrigger>
								<AlignJustify size={22} className="lg:hidden" />
							</SheetTrigger>
							<CustomSheet />
						</Sheet>
					</div>

					<div className="hidden lg:block">
						<HoverCustomCard content="Explore" />
					</div>
				</div>
				<div className="flex-1 flex-shrink hidden md:block md:ml-6">
					<SearchBar />
				</div>

				<div className="hidden lg:flex  items-center justify-around gap-x-2 ">
					<HoverCustomCard content="Become a tutor" />
					<Link href="/my-sessions/upcoming-sessions">
						<HoverCustomCard content="MySessions" />
					</Link>
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
