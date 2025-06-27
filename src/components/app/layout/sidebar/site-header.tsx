"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
export function SiteHeader({
	tutor_status,
}: {
	tutor_status?: TTutorStatus | null;
}) {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
			<div className="flex w-full px-4 lg:px-6 justify-between items-center">
				<div className="flex w-full items-center gap-1 lg:gap-2 ">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mx-2 data-[orientation=vertical]:h-4"
					/>
					<h1 className="text-base font-extrabold md:text-xl ">
						{pathname.split("/")[2].toLocaleUpperCase().replace("-", " ")}
					</h1>
				</div>{" "}
				{pathname.split("/")[2] === "sessions" && (
					<Button
						disabled={tutor_status === "suspended"}
						onClick={() => router.push("/tutor-dashboard/create-session")}
						className="cursor-pointer">
						{tutor_status === "suspended" ? "Suspended" : "Create Session"}
					</Button>
				)}
			</div>
		</header>
	);
}
