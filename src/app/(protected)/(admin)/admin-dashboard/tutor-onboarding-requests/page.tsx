import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { fetchTutorRequests } from "@/hooks/use-infinite-tutor-requests";
import TutorRequestList from "@/components/app/features/tutor/tutor-registration/tutor-request-list";

export default async function TutorOnboardingRequestsPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchInfiniteQuery({
		queryKey: ["tutor-requests"],
		queryFn: ({ pageParam = 0 }) => fetchTutorRequests({ pageParam, LIMIT: 5 }),
		getNextPageParam: (
			lastPage: TBankInfoJoinTutorResult[] | null,
			allPages: TBankInfoJoinTutorResult[][] | null,
		) =>
			lastPage && lastPage.length === 5
				? allPages && allPages.length * 5
				: undefined,
		initialPageParam: 0,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="max-w-6xl mx-auto p-6">
				<header className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">Tutor Onboarding</h1>
					<p className="text-gray-600 mt-2">
						Verify tutor applications by checking name consistency across
						system, ID, and bank details
					</p>
				</header>
				<TutorRequestList />
			</div>
		</HydrationBoundary>
	);
}
