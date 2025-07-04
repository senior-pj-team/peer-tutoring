import AppSideBar from "@/components/app/layout/sidebar/app-sidebar";
import { SiteHeader } from "@/components/app/layout/sidebar/site-header";
import GeneralError from "@/components/app/shared/error";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { getUserSession } from "@/utils/get-user-session";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
	LayoutDashboard,
	UserCog,
	FileWarning,
	Book,
	Database,
	DollarSign,
	Banknote,
} from "lucide-react";

const menus = [
	{
		title: "Browse Session",
		url: "/admin-dashboard/browse-session",
		icon: <LayoutDashboard size={18} />,
	},
	{
		title: "Transfer to Tutor",
		url: "/admin-dashboard/manage-transfer/pending",
		icon: <DollarSign size={18} />,
	},
	{
		title: "Tutor Onboarding",
		url: "/admin-dashboard/tutor-onboarding-requests",
		icon: <UserCog size={18} />,
	},
	{
		title: "Manage Tutor",
		url: "/admin-dashboard/manage-tutor",
		icon: <Database size={18} />,
	},
	{
		title: "Manage Report & Refund",
		url: "/admin-dashboard/manage-report-refund/report",
		icon: <FileWarning size={18} />,
	},
	{
		title: "Financial Analysis",
		url: "/admin-dashboard/financial/stats",
		icon: <Banknote size={18} />,
	},
];

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

	if (userData.role !== "admin") {
		return <div className="pt-5 px-5"> Access Denied for this page </div>;
	}
	return (
		<div>
			<SidebarProvider>
				<AppSideBar variant="inset" collapsible="icon" menus={menus} />

				<SidebarInset>
					<SiteHeader />
					<div className="@container/main flex flex-1 flex-col gap-2 h-full">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 h-full">
							<div className="px-4 lg:px-6 h-full">{children}</div>
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
