import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function page() {
	return (
		<div className=" flex flex-col items-center px-4 md:py-40 sm:py-30">
			<div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center space-y-6">
				{/* Success Icon */}
				<CheckCircle className="h-20 w-20 text-green-500 mx-auto" />

				{/* Success Message */}
				<h1 className="text-2xl font-semibold text-gray-800">
					Payment Successful
				</h1>
				<p className="text-gray-600 text-sm">
					Your payment has been received. You’ll get a confirmation email
					shortly. Please check for furthur details.
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
