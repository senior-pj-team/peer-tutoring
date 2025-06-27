import AppSideBar from "@/components/app/layout/sidebar/app-sidebar";
import { SiteHeader } from "@/components/app/layout/sidebar/site-header";
import GeneralError from "@/components/app/shared/error";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { getUserSession } from "@/utils/get-user-session";
import { redirect } from "next/navigation";
import loading from "./warning/loading";
import { createClient } from "@/utils/supabase/server";

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
	const tutor_data = {
		...user,
		email: userData.email,
		full_name: userData.username ?? "",
		profile_url: userData.profile_url,
		user_role: userData.role,
		tutor_status: userData.tutor_status,
	};

	if (user?.user_role !== "tutor") {
		return <div className="pt-5 px-5"> Access Denied for this page </div>;
	}

	return (
		<div>
			<SidebarProvider>
				<AppSideBar variant="inset" collapsible="icon" />

				<SidebarInset>
					<SiteHeader />
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<div className="px-4 lg:px-6">{children}</div>
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
