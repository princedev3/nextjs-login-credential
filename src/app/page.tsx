"use client";
import { useSessionStore } from "@/components/store/user-session";
import Image from "next/image";

export default function Home() {
  const session = useSessionStore((state) => state.session);

  return <div className="">home</div>;
}
