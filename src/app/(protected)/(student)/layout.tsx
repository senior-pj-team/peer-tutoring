import Navbar from "@/components/custom/layout/navbar/navbar";
import React from "react";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
