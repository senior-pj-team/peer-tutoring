import { Button } from "@/components/ui/button";
import { OctagonAlert } from "lucide-react";
import Link from "next/link";

export default function page() {
	return (
		<div className=" flex flex-col items-center px-4 py-40">
			<div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center space-y-6">
				{/* Success Icon */}
				<OctagonAlert className="h-20 w-20 text-red-500 mx-auto" />

				{/* Success Message */}
				<h1 className="text-2xl font-semibold text-gray-800">Payment Failed</h1>
				<p className="text-gray-600 text-sm">
					Your payment has been failed. If you want to enroll this session,
					please do checkout again.
				</p>

				{/* Optional Button */}

				<Link href="/home">
					{" "}
					<Button className="w-full mt-4 cursor-pointer">
						Explore more sessions
					</Button>
				</Link>
			</div>
		</div>
	);
}
