import { BankFormServer } from "@/components/app/features/profile-settings/bank-form-server";
import { ProfileSkeleton } from "@/components/app/features/profile-settings/profile-skeleton";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function Page() {
	return (
		<div className="xl:p-2 xl:w-[75%]">
			<div className="flex flex-col space-y-1.5">
				<span className="font-semibold md:text-[1.15rem] text-[0.85rem]">
					Payment Setup
				</span>
				<span className="font-extralight text-gray-500 md:text-[0.8rem] text-[0.55rem]">
					Configure your bank account info. Note that if there is any refund
					cases, refund will be transferred to account setup here.
				</span>
			</div>
			<Separator className="my-5" />
			<Suspense fallback={<ProfileSkeleton />}>
				<BankFormServer />
			</Suspense>
		</div>
	);
}
