"use client";
import { Session } from "next-auth";
import React, { useEffect } from "react";
import { useSessionStore } from "./user-session";

const SessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const setSession = useSessionStore((state) => state.setSession);
  useEffect(() => {
    setSession(session);
  }, [session, setSession]);
  return <div>{children} </div>;
};

export default SessionProvider;
