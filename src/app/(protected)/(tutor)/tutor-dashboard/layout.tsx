"use client";
import AppSideBar from "@/components/app/layout/sidebar/app-sidebar";
import { SiteHeader } from "@/components/app/layout/sidebar/site-header";
import { useAuth } from "@/components/providers/auth-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function layout({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	const { user, loading } = useAuth();
	if (!loading && user?.user_role !== "tutor") {
		return <div className="pt-5 px-5"> Access Denied for this page </div>;
	}

	if (!loading && user) {
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
}
