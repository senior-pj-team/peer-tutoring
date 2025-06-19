import { Roboto_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import React from "react";

const roboto_mono = Roboto_Mono({
	weight: ["700"],
	subsets: ["latin"],
});

export default async function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="mt-10 max-w-6xl mx-auto min-h-screen px-5 md:px-8 xl:px-0">
			<h2 className={cn("text-3xl font-semibold mb-6", roboto_mono.className)}>
				Notifications
			</h2>
			{children}
		</div>
	);
}
