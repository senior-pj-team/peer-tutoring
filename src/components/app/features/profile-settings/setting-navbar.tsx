"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function SettingNavbar() {
	const links = [
		{ label: "Profile", value: "profile" },
		{ label: "Payment setup", value: "payment" },
	];
	const pathname = usePathname();
	return (
		<div className="hidden flex-col space-y-2 p-2 lg:flex">
			{links.map(({ label, value }) => {
				const isActive = pathname.endsWith(`/profile-setting/${value}`);
				return (
					<Link
						key={value}
						href={`/profile-setting/${value}`}
						className={`w-full text-[0.85rem] p-2 rounded-md font-medium cursor-pointer transition-colors duration-200 ${
							isActive
								? "bg-orange-400 text-white font-extrabold"
								: " hover:bg-orange-100 "
						}`}>
						{label}
					</Link>
				);
			})}
		</div>
	);
}
