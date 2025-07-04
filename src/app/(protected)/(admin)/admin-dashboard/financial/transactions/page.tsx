import { TransactionListServer } from "@/components/app/features/admin/financial/transaction-list-server";
import GeneralError from "@/components/app/shared/error";
import GeneralLoading from "@/components/app/shared/general-loading";
import { getUserSession } from "@/utils/get-user-session";
import { Suspense } from "react";

export default async function page() {
	const user = await getUserSession();
	if (!user) {
		return <GeneralError />;
	}
	return (
		<Suspense fallback={<GeneralLoading />}>
			<TransactionListServer />
		</Suspense>
	);
}
