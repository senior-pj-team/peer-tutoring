import SessionHeader from "@/components/session/session-header";
import React from "react"
import Tabs from "@/components/custom/tabs"


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
      <div className="px-6">
        <Tabs tabs={tabs} />
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
