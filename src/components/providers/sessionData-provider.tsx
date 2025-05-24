"use client";

import React, { createContext, useContext } from "react";
import { Session } from "@/types/session";

export const SessionContext = createContext<Session | null>(null);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider = ({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};
