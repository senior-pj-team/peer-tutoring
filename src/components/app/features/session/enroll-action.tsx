import React from "react";
import { Hourglass, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const EnrollAction = () => {
	return (
		<>
			<p className="text-sm font-medium">
				<Hourglass className="w-4 h-4 text-orange-500 font-bold inline me-1" />
				Only <span className="font-bold">2 days</span> left until session
				starts!
			</p>

			<p className="text-lg font-bold text-gray-800">
				Price: <span className="text-orange-600">฿ 150</span>
			</p>

			<div className="grid grid-cols-[8fr_1fr] gap-2 w-full">
				<Link href="/payment">
					{" "}
					<Button className="bg-orange-500 hover:bg-orange-600 text-white w-full px-4 py-2 text-sm cursor-pointer">
						Enroll Now
					</Button>
				</Link>

				<div className="p-2 border rounded-sm cursor-pointer text-orange-500 group">
					<Heart size="20" className="group-hover:fill-orange-500" />
				</div>
			</div>
		</>
	);
};

export default EnrollAction;
