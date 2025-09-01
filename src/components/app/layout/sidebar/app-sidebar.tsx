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
import { Book } from "lucide-react";
import Link from "next/link";

type Menus = {
	title: string;
	url: string;
	icon: React.ReactNode;
};

export default function AppSideBar({
	menus,
	...props
}: { menus: Menus[] } & React.ComponentProps<typeof Sidebar>) {
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
											{menu.icon}
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
					<Link href="/home">
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
