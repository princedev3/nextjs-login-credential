"use client";
import { useSessionStore } from "@/components/store/user-session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default function Home() {
  const session = useSessionStore((state) => state.session);

  return (
    <div className="mt-24">
      <div className="text-blue-950  gap-y-2 grid justify-items-center w-full ">
        <div className="flex items-center gap-3">
          <p className="motion-preset-blur-right  text-4xl bg-gradient-to-l from-blue-800 to-blue-950 text-transparent bg-clip-text font-bold">
            welcome
          </p>
          <span className="text-3xl motion-preset-seesaw-sm">👋</span>
        </div>
        <div className="text-4xl bg-gradient-to-r from-blue-800 to-blue-950 text-transparent bg-clip-text font-bold">
          Invoicepedia
        </div>
        <div className=" motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md font-semibold">
          We help you manage your invoices
        </div>
        <Button
          className="bg-blue-950 hover:bg-blue-950 capitalize mt-8 text-white motion-preset-pulse-sm"
          asChild
        >
          <Link href={"/invoices"} className="flex items-center gap-2">
            check your invoices <span className="">👉</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
