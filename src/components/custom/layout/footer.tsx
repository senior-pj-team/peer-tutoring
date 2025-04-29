"use client";

import Link from "next/link";

export function Footer() {
	return (
		<footer className="footer bg-gray-900 text-gray-300 flex flex-col items-center gap-6 p-7 border-t-1 border-gray-600 z-50">
			<div className="flex items-center gap-2 text-2xl font-semibold">
				<span>O r i o n</span>
			</div>
			<aside>
				<p className="text-lg">
					© {new Date().getFullYear()} Orion Group. All rights reserved...
				</p>
			</aside>

			<nav className="text-gray-300 grid grid-cols-2 sm:grid-cols-4 gap-8">
				<Link href="#" className="link link-hover hover:text-gray-400">
					License
				</Link>
				<Link href="#" className="link link-hover hover:text-gray-400">
					Help
				</Link>
				<Link href="#" className="link link-hover hover:text-gray-400">
					Contact
				</Link>
				<Link href="#" className="link link-hover hover:text-gray-400">
					Policy
				</Link>
			</nav>

			<div className="flex gap-6 mt-6">
				<a
					href="#"
					className="link text-gray-300 hover:text-gray-400"
					aria-label="Github Link">
					<span className="icon-[tabler--brand-github] size-5"></span>
				</a>
				<a
					href="#"
					className="link text-gray-300 hover:text-gray-400"
					aria-label="Facebook Link">
					<span className="icon-[tabler--brand-facebook] size-5"></span>
				</a>
				<a
					href="#"
					className="link text-gray-300 hover:text-gray-400"
					aria-label="Twitter Link">
					<span className="icon-[tabler--brand-x] size-5"></span>
				</a>
				<a
					href="#"
					className="link text-gray-300 hover:text-gray-400"
					aria-label="Google Link">
					<span className="icon-[tabler--brand-google] size-5"></span>
				</a>
			</div>
		</footer>
	);
}
