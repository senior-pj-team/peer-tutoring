import { Footer } from "@/components/custom/footer";
import AppSideBar from "@/components/custom/sidebar/app-sidebar";
import { SiteHeader } from "@/components/custom/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function layout({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	return (
		<div>
			<SidebarProvider>
				<AppSideBar variant="inset" collapsible="icon" />

				<SidebarInset>
					<SiteHeader />
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						<div className="px-4 lg:px-6">{children}</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}
