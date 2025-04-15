import Navbar from "@/components/custom/navbar";
import React from "react";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="overflow-auto">
			<Navbar />
			{children}
		</div>
	);
}
