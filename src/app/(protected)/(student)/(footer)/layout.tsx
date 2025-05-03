import { Footer } from "@/components/custom/layout/footer";
import React from "react";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<div className="min-h-screen flex flex-col pt-[5rem]">
				<div className="flex-grow overflow-auto">{children}</div>
				<Footer />
			</div>
		</>
	);
}
