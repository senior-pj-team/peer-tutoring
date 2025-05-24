import Tabs from "@/components/app/shared/tabs";
import React from "react";
import { Roboto_Mono } from "next/font/google";
const roboto_mono = Roboto_Mono({
	weight: ["700"],
	subsets: ["latin"],
});
const Layout = ({ children }: { children: React.ReactNode }) => {
	const tabs = [
		{ name: "Upcoming", path: "/my-sessions/upcoming-sessions" },
		{ name: "Refunded", path: "/my-sessions/refunded-sessions" },
		{ name: "Completed", path: "/my-sessions/completed-sessions" },
		{ name: "Archived", path: "/my-sessions/archived-sessions" },
		{ name: "Wish List", path: "/my-sessions/wishlist-sessions" },
	];
	return (
		<div>
			<div className="px-6 pt-12 pb-6">
				<h1
					className={`text-4xl font-extrabold ${roboto_mono.className} antialiased`}>
					My Sessions
				</h1>
				<p className="mt-2 font-bold text-gray-500">
					Manage and view all your sessions in one place
				</p>
			</div>
			<div className="p-6 px-15">
				<Tabs tabs={tabs} />
			</div>
			<div className="px-15 min-h-[60vh] py-3">{children}</div>
		</div>
	);
};

export default Layout;
