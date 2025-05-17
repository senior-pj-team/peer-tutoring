import Navbar from "@/components/custom/layout/navbar/navbar";
import { useAuth } from "@/components/providers/auth-provider";
import React from "react";

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const { user } = useAuth();
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
