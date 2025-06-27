import AppSideBar from "@/components/app/layout/sidebar/app-sidebar";
import { SiteHeader } from "@/components/app/layout/sidebar/site-header";
import GeneralError from "@/components/app/shared/error";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { getUserSession } from "@/utils/get-user-session";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Ban } from "lucide-react";

export default async function layout({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	const user = await getUserSession();
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

	if (user.user_role !== "tutor" && user.user_role !== "admin") {
		return <div className="pt-5 px-5"> Access Denied for this page </div>;
	}

	return (
		<div>
			<SidebarProvider>
				<AppSideBar variant="inset" collapsible="icon" />

				<SidebarInset>
					<SiteHeader tutor_status={userData.tutor_status} />
					<div className="@container/main flex flex-1 flex-col gap-1">
						{userData.tutor_status === "suspended" && (
							<div className="w-full h-5  rounded-b-3xl  bg-red-100 flex justify-center items-center ">
								<span className="text-xs text-red-500 block ">
									You have been suspended currently by admin team. You cannot
									create new sessions now.
								</span>
								<Ban size={10} className="text-red-500" />
							</div>
						)}

						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<div className="px-4 lg:px-6">{children}</div>
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
