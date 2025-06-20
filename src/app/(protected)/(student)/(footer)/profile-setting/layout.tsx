import SettingNavbar from "@/components/app/features/profile-settings/setting-navbar";
import Tabs from "@/components/app/shared/tabs";

import { Separator } from "@/components/ui/separator";

export default function layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="py-[3rem] px-[3rem] overflow-y-auto">
			<div className="flex flex-col">
				<span className="xl:text-2xl md:text-xl text-lg font-extrabold mb-2">
					Settings
				</span>
				<span className="text-gray-500 md:text-sm text-xs font-bold">
					Manage your account settings and payment setup
				</span>
				<Separator className="my-4 font-extrabold" />

				<div className="lg:hidden mb-4 flex gap-1 items-center">
					{/* <ChevronLeftIcon size={18} className=" md:hidden" /> */}
					<Tabs
						tabs={[
							{ name: "Profile", path: "/profile-setting/profile" },
							{ name: "Payment", path: "/profile-setting/payment" },
						]}
					/>
					{/* <ChevronRightIcon size={18} className="md:hidden" /> */}
				</div>
				<div className="grid lg:grid-cols-5 gap-5 ">
					<div className="hidden lg:block">
						<SettingNavbar />
					</div>

					<div className="lg:col-span-4">{children}</div>
				</div>
			</div>
		</div>
	);
}
