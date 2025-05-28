import React from 'react';
import { redirect } from 'next/navigation';

import SessionHeader from '@/components/app/features/session/session-header';
import CompletedAction from '@/components/app/features/session/completed-action';
import UpcomingAction from '@/components/app/features/session/upcoming-action';
import EnrollAction from '@/components/app/features/session/enroll-action';
import ArchivedAction from '@/components/app/features/session/archived-action';
import RefundStatus from '@/components/app/features/session/refund-status';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SessionContent from '@/components/app/features/session/SessionContent';
import SessionPayment from '@/components/app/features/session/SessionPayment';
import SessionTutor from '@/components/app/features/session/SessionTutor';

import { createClient } from '@/utils/supabase/server';
import { selectStudentSessionDetail } from '@/data/queries/sessions/select-student-session-view-detail';
import { getUserSession } from '@/utils/getUserSession';
import { parseTimeRange } from '@/utils/sessionsUtils';

interface PageProps {
  params: {
    session_id: string;
    page: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { session_id, page } = params;

  const user = await getUserSession();
  if (!user) redirect('/login');

  let sessionData: TStudentSessionViewDetailResult | null = null;

  try {
    const supabase = await createClient();
    sessionData = await selectStudentSessionDetail(Number(session_id), user.user_id, supabase);
  } catch (error) {
    console.error('Failed to fetch session details:', error);
    // handle error here
  }

  if (!sessionData) {
    return <div className="text-center text-red-500">Failed to load session data.</div>;
  }

  const tutor = sessionData.tutor as { name: string; rating: number; id: number };

  const headerData: TSessionHeaderData = {
    image: sessionData.image,
    session_name: sessionData.session_name,
    school: sessionData.school,
    major: sessionData.major,
    course_code: sessionData.course_code,
    course_name: sessionData.course_name,
    tutor_name: tutor.name,
    tutor_rating: tutor.rating,
    session_status: sessionData.session_status,
  };

  const { date, start_time, end_time } = parseTimeRange(
    sessionData.start_time,
    sessionData.end_time
  );

  const contentData: TSessionContentData = {
    description: sessionData.description,
    requirement: sessionData.requirement,
    location: sessionData.location,
    date,
    start_time,
    end_time,
    max_students: sessionData.max_students,
    enrolled_students: sessionData.enrolled_students,
  };

  const paymentData: TSessionPaymentData | null =
    page !== 'browse'
      ? {
          price: sessionData.price,
          refunded_amount: sessionData.refunded_amount,
        }
      : null;

  const tutorId = page === 'browse' ? tutor.id : null;

  return (
    <div>
      <SessionHeader data={headerData} />
      <hr />
      <div className="relative px-4 pb-10 mt-5 xl:px-15">
        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-4 bg-orange-100 rounded-md p-1">
            <TabsTrigger
              value="content"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700"
            >
              Content
            </TabsTrigger>
            {paymentData && (
              <TabsTrigger
                value="payment"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700"
              >
                Payment
              </TabsTrigger>
            )}
            {tutorId && (
              <TabsTrigger
                value="tutor"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700"
              >
                Tutor
              </TabsTrigger>
            )}
          </TabsList>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 relative min-h-[30rem]">
            <div className="w-full">
              <TabsContent value="content">
                <SessionContent data={contentData} />
              </TabsContent>
              {paymentData && (
                <TabsContent value="payment">
                  <SessionPayment />
                </TabsContent>
              )}
              {tutorId && (
                <TabsContent value="tutor">
                  <SessionTutor tutor_id= {tutorId} />
                </TabsContent>
              )}
            </div>

            <aside className="static xl:block xl:sticky xl:top-20 xl:right-[5rem] h-fit border shadow p-5 rounded-lg bg-white w-[20rem]">
              {page === 'complete' && <CompletedAction />}
              {page === 'upcoming' && <UpcomingAction />}
              {page === 'browse' && <EnrollAction />}
              {page === 'archived' && <ArchivedAction />}
              {page === 'refund' && <RefundStatus status="rejected" />}
            </aside>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
