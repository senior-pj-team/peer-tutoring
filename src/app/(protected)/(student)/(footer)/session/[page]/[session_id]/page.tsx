import React from 'react';
import { redirect } from 'next/navigation';

import SessionHeader from '@/components/app/features/session/session-header';
import CompletedAction from '@/components/app/features/session/completed-action';
import UpcomingAction from '@/components/app/features/session/upcoming-action';
import EnrollAction from '@/components/app/features/session/enroll-action';
import ArchivedAction from '@/components/app/features/session/archived-action';
import RefundStatus from '@/components/app/features/session/refund-status';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SessionContent from '@/components/app/features/session/session-centent';
import SessionPayment from '@/components/app/features/session/session-payment';
import SessionTutor from '@/components/app/features/session/session-tutor';

interface PageProps {
  params: {
    session_id: string;
    page: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { session_id, page } = await params;
  const tutorId= "bb069698-5b2f-48e7-a44d-3bda6df88407";


  return (
    <div>
      <>
        {/* SessionHeader */}
      </>
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
            {page!="browse" && (
              <TabsTrigger
                value="payment"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700"
              >
                Payment
              </TabsTrigger>
            )}
            {page=="browse" && (
              <TabsTrigger
                value="tutor"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700"
              >
                Tutor
              </TabsTrigger>
            )}
          </TabsList>
          
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 relative min-h-[40rem]">
            <div className="w-full">
              <TabsContent value="content">
              </TabsContent>
              {page !="browse" && (
                <TabsContent value="payment">
                  <SessionPayment session_id={Number(session_id)} />
                </TabsContent>
              )}
              {page=="browse" && (
                <TabsContent value="tutor">
                  <SessionTutor tutor_id= {tutorId} />
                </TabsContent>
              )}
            </div>

            <aside className="static xl:block xl:sticky xl:top-40 xl:right-[5rem] h-fit border shadow p-5 rounded-lg bg-white w-[25rem] space-y-3">
              {page === 'complete' && <CompletedAction sessionId={Number(session_id)}/>}
              {page === 'upcoming' && <UpcomingAction start={"2025-05-25 04:00:00+00"}/>}
              {page === 'browse' && <EnrollAction />}
              {page === 'archived' && <ArchivedAction sessionId={Number(session_id)}/>}
              {page === 'refund' && <RefundStatus sessionId={Number(session_id)} />}
            </aside>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
