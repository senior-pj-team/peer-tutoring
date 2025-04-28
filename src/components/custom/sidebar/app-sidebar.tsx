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
import {
	BarChartIcon,
	UsersIcon,
	User,
	Star,
	CircleAlert,
	Shapes,
	Book,
} from "lucide-react";
import Link from "next/link";

const menus = [
	{
		title: "Profile",
		url: "/tutor-dashboard/profile",
		icon: User,
	},
	{
		title: "Sessions",
		url: "/tutor-dashboard/sessions/upcoming-sessions",
		icon: Shapes,
	},
	{
		title: "Students",
		url: "/tutor-dashboard/students",
		icon: UsersIcon,
	},
	{
		title: "Financial",
		url: "/tutor-dashboard/financial/stats",
		icon: BarChartIcon,
	},
	{
		title: "Rating and Reviews",
		url: "/tutor-dashboard/rating-reviews",
		icon: Star,
	},
	{
		title: "Warning",
		url: "/tutor-dashboard/warning",
		icon: CircleAlert,
	},
];

export default function AppSideBar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar
			collapsible="offcanvas"
			{...props}
			className="overflow-hidden bg-gray-900">
			<SidebarHeader className="bg-gray-900">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5">
							<Link href="#">
								<span className="font-semibold text-2xl text-white">Orion</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="bg-gray-900">
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{menus.map((menu) => (
								<SidebarMenuItem key={menu.title}>
									<Link href={menu.url}>
										<SidebarMenuButton
											tooltip={menu.title}
											className="cursor-pointer text-white hover:bg-gray-700 hover:text-white p-5 mb-2">
											{menu.icon && <menu.icon size={18} />}
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
							<Book size={18} />
							<span>Go to Student</span>
						</SidebarMenuButton>
					</Link>
				</SidebarMenuItem>
			</SidebarFooter>
		</Sidebar>
	);
}
