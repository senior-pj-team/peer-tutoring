import Navbar from "@/components/app/layout/navbar/navbar";
import GeneralError from "@/components/app/shared/error";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	let user = await getUserSession();
	if (!user) {
		redirect("/login");
	}

	const supabase = await createClient();
	const userData = await getUserById(supabase, user.user_id);
	if (!userData) {
		return (
			<>
				<GeneralError />
			</>
		);
	}
	user = {
		...user,
		email: userData.email,
		full_name: userData.username ?? "",
		profile_url: userData.profile_url,
		user_role: userData.role,
	};

	if (user?.user_role !== "student" && user?.user_role !== "tutor") {
		return <div className="pt-5 px-5"> Access Denied for this page </div>;
	}

	return (
		<>
			<Navbar user={user} />
			{children}
		</>
	);
}
