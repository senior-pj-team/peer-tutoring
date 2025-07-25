"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

//seperate component
const Tabs = ({ tabs }: { tabs: { name: string; path: string }[] }) => {
	const pathname = usePathname();
	return (
		<ul className="flex overflow-auto md:text-sm text-xs font-medium  text-center text-gray-500 border-b border-gray-200">
			{tabs.map((tab) => {
				const isActive = pathname === tab.path;

				return (
					<li key={tab.name} className="me-2">
						<Link
							href={tab.path}
							className={`inline-block md:p-4 px-2 py-3 transition-colors duration-200 rounded-md ${
								isActive
									? "text-white bg-orange-400"
									: "text-gray-500 hover:text-orange-400 hover:bg-orange-50"
							}`}>
							{tab.name}
						</Link>
					</li>
				);
			})}
		</ul>
	);
};

export default Tabs;
