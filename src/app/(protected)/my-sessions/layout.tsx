import Tabs from "@/components/custom/tabs";
import React from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div>
      <div className="flex items-center bg-black px-7 py-15">
        <h1 className="text-5xl text-white">My Sessions</h1>
      </div>
      <Tabs/>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
