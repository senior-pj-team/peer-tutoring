import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getTutorCounts } from "@/data/queries/tutors/get-tutor-counts";
import { getTutorWithStats } from "@/data/queries/tutors/get-tutor-with-stats";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GeneralError from "@/components/app/shared/error";
import TutorCountsCard from "@/components/app/features/tutor/tutor-counts";
import TutorTable from "@/components/app/features/tutor/tutor-table";
import { createClient } from "@/utils/supabase/server";
import { getQueryClient } from "@/utils/app/get-query-client";


export default async function ManageTutorPage() {
  const supabse = await createClient();

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tutors", 0, ""],
    queryFn: async () =>
      await getTutorWithStats(supabse, {
        p_offset: 0,
        p_limit: 7,
      }),
  });

  const data = await getTutorCounts();
  if (!data || data.length !== 1) return <GeneralError />;
  const tutorCounts = data[0];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Tutor Management
          </h1>
          <p className="text-muted-foreground">
            Manage warnings and account suspensions
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tutor Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <TutorCountsCard
              activeTutors={tutorCounts.active_tutors}
              suspendedTutors={tutorCounts.suspended_tutors}
              tutorsWith3PlusWarnings={tutorCounts.tutors_with_3plus_warnings}
            />
          </CardContent>
        </Card>

        <TutorTable />
      </div>
    </HydrationBoundary>
  );
}
