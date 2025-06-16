import Navbar from "@/components/app/layout/navbar/navbar";
import { getUserSession } from "@/utils/app/get-user-session";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const user = await getUserSession();

	if (!user) {
		redirect("/login");
	}
	if (user?.user_role !== "student" && user?.user_role !== "tutor") {
		return <div className="pt-5 px-5"> Access Denied for this page </div>;
	}
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
