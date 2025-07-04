import { SessionListServer } from "@/components/app/features/admin/sessions/session-list-server";
import { SessionSkeletonList } from "@/components/app/shared/sessions/session-skeleton-list";
import { Suspense } from "react";

export default async function page() {
	return (
		<div className="px-8 pt-8 pb-2">
			{/* Page Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Browse Sessions
				</h1>
				<p className="text-gray-600">View and manage all tutoring sessions</p>
			</div>
			<Suspense fallback={<SessionSkeletonList />}>
				<SessionListServer />
			</Suspense>
		</div>
	);
}
