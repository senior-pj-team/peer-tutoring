import Navbar from "@/components/custom/navbar/navbar";
import React from "react";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Navbar />
			<div className="overflow-auto pt-[5rem]">
				{children}
			</div>
		</>
	);
}
