import { ProfileFromServer } from "@/components/app/features/profile-settings/profile-form-server";
import { ProfileSkeleton } from "@/components/app/features/profile-settings/profile-skeleton";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

export default function page() {
	return (
		<div className="xl:p-2 xl:w-[75%]">
			<div className="flex flex-col space-y-1.5">
				<span className="font-semibold md:text-[1.15rem] text-[0.85rem]">
					Profile page
				</span>
				<span className="font-extralight text-gray-500 md:text-[0.8rem] text-[0.55rem]">
					This is profile setting. You can edit here
				</span>
			</div>
			<Separator className="my-5 font-extrabold" />
			<Suspense fallback={<ProfileSkeleton />}>
				<ProfileFromServer />
			</Suspense>
		</div>
	);
}
