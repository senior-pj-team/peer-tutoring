import React from "react";
import Stepper from "@/components/app/features/tutor/tutor-registration/Stepper";
import { getUserSession } from "@/utils/get-user-session";
import GeneralError from "@/components/app/shared/error";
import { getUserById } from "@/data/queries/user/get-user-by-id";
import { createClient } from "@/utils/supabase/server";
import { getBankInfoByUser } from "@/data/queries/bank-info/get-bank-info-by-user";
import Link from "next/link";

export default async function BecomeTutorPage() {
	const user = await getUserSession();
	const supabase = await createClient();
	if (!user?.user_id) return <GeneralError />;

	const userData = await getUserById(supabase, user.user_id);
	const bankData = await getBankInfoByUser(supabase, { user_id: user.user_id });
	
	if (!bankData) return <GeneralError />;

	return (
		<div className="max-w-2xl mx-auto p-4">
				{userData?.tutor_status === "pending" ? (
					<div className="flex flex-col items-center justify-center text-center space-y-2 pt-[20%]">
						<p className="text-yellow-600 font-semibold text-lg">
							Your tutor application is currently under review.
						</p>
						<p className="text-gray-600">
							We appreciate your patience. You will be notified once approved.
						</p>
						<Link
							href="/home"
							className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded transition-colors"
						>
							Back to Home
						</Link>
					</div>
				) : userData?.tutor_status === "rejected" ? (
					<div className="space-y-2 text-center pt-[5%] text-md">
						<p className="text-red-600 font-semibold">
							Your last tutor application was rejected.
						</p>
						<p className="text-gray-600">
							You can submit a new application by filling the form below.
						</p>
						<Stepper userData={userData} bankData={bankData[0] ?? null} />
					</div>
				) : !userData?.tutor_status ? (
					<Stepper userData={userData} bankData={bankData[0] ?? null} />
				) : (
					<div className="text-center text-gray-500 font-medium">
						Something went wrong. Please contact support.
					</div>
				)}
		</div>
	);
}
