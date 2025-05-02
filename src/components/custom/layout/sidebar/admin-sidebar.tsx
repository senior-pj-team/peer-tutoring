"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutDashboard, UserCog, FileWarning, Book } from "lucide-react";
import Link from "next/link";

const adminMenus = [
  {
    title: "Browse Session",
    url: "/admin-dashboard/browse-session",
    icon: LayoutDashboard,
  },
  {
    title: "Transfer to Tutor",
    url: "/admin-dashboard/manage-transfer/pending",
    icon: LayoutDashboard,
  },
  {
    title: "Tutor Onboarding",
    url: "/admin-dashboard/tutor-onboarding-requests",
    icon: UserCog,
  },
  {
    title: "Manage Tutor",
    url: "/admin-dashboard/manage-tutor",
    icon: UserCog,
  },
  {
    title: "Manage Report & Refund",
    url: "/admin-dashboard/manage-report-refund",
    icon: FileWarning,
  },
];

export default function AdminSideBar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="overflow-hidden bg-gray-900"
    >
      <SidebarHeader className="bg-gray-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <span className="font-semibold text-2xl text-white">
                  Orion{" "}
                  <span className="text-sm font-medium text-orange-400">
                    Admin
                  </span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-gray-900">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenus.map((menu) => (
                <SidebarMenuItem key={menu.title}>
                  <Link href={menu.url} aria-label={menu.title}>
                    <SidebarMenuButton
                      tooltip={menu.title}
                      className="cursor-pointer text-white hover:bg-gray-700 hover:text-white p-5 mb-2"
                    >
                      {menu.icon && <menu.icon size={18} className="mr-2" />}
                      <span>{menu.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-gray-900">
        <SidebarMenuItem>
          <Link href="/">
            <SidebarMenuButton className="cursor-pointer text-white hover:bg-gray-700 hover:text-white p-5 mb-2">
              <Book size={18} className="mr-2" />
              <span>Go to Student</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}
