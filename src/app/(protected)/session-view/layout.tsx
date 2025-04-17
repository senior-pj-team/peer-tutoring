import SessionHeader from "@/components/custom/session/session-header";
import React from "react"
import Tabs from "@/components/custom/tabs"
import EnrollAction from "@/components/custom/session/enroll-action";
import UpcomingAction from "@/components/custom/session/upcoming-action";
import CompletedAction from "@/components/custom/session/completed-action";


const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const tabs = [
    { name: 'Content', path: '/session-view/content' },
    { name: 'Tutor Info', path: '/session-view/tutor-info' },
    { name: 'Payment', path: '/session-view/payment-info' }
  ];
  return (
    <div>
      <SessionHeader />
      <hr />
      <div className="px-6 pb-10">
        <Tabs tabs={tabs} />
        <div className="relative">
          {children}
          <hr className="block xl:hidden"/>
          <div className="static xl:absolute xl:top-15 xl:right-30 xl:shadow xl:border xl:shadow-sm xl:max-w-sm p-5 space-y-2">
            {/* <EnrollAction/> */}
            {/* <UpcomingAction/> */}
            <CompletedAction/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
