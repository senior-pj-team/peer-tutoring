import AdminSideBar from "@/components/custom/layout/sidebar/admin-sidebar";
import { SiteHeader } from "@/components/custom/layout/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
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
