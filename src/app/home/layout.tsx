import { Footer } from "@/components/app/layout/footer";
import Navbar from "@/components/app/layout/navbar/navbar";
import { createClient } from "../../utils/supabase/server";
import React from "react";
import { getUserSession } from "@/utils/get-user-session";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { redirect } from "next//navigation";
import GeneralError from "@/components/app/shared/error";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	let user = await getUserSession();
	if (user) {
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
	}
	return (
		<>
			<Navbar user={user} />
			<div className="min-h-screen flex flex-col pt-[5rem]">
				<div className="flex-grow overflow-auto">{children}</div>
				<Footer />
			</div>
		</>
	);
}
