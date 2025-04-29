import { Footer } from "@/components/custom/layout/footer";
import Navbar from "@/components/custom/layout/navbar/navbar";
import React from "react";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Navbar />
			<div className="min-h-screen flex flex-col pt-[5rem]">
				<div className="flex-grow overflow-auto">{children}</div>
				<Footer />
			</div>
		</>
	);
}
