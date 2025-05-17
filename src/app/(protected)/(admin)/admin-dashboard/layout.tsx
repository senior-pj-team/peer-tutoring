"use client";

import AdminSideBar from "@/components/custom/layout/sidebar/admin-sidebar";
import { SiteHeader } from "@/components/custom/layout/sidebar/site-header";
import { useAuth } from "@/components/providers/auth-provider";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function AdminLayout({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	const { user } = useAuth();
	if (user?.user_role !== "admin") {
		return <div className="pt-5 px-5"> Access Denied for this page </div>;
	}
	return (
		<div>
			<SidebarProvider>
				<AdminSideBar variant="inset" collapsible="icon" />

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
