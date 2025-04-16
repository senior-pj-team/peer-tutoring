import Tabs from "@/components/custom/tabs";
import React from "react";
import { Roboto_Mono } from "next/font/google";
const gothic= Roboto_Mono({
  weight: ["700"],
  subsets: ["latin"]
})
const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div>
      <div className="px-6 pt-12 pb-6">
      <h1 className={`text-4xl font-extrabold ${gothic.className} antialiased`}>My Sessions</h1>
      <p className="mt-2 font-bold text-gray-500">Manage and view all your sessions in one place</p>
      </div>
      <div className="p-6">
        <Tabs/>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
