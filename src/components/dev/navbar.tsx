"use client";
import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { logout } from "@/actions/logout-action";
import { useRouter } from "next/navigation";
import { useSessionStore } from "../store/user-session";
import { UserButton } from "./userbutton";

const Navbar = () => {
  const session = useSessionStore((state) => state.session);

  return (
    <div className="border-b border-zinc-100 ">
      <div className="w-full max-w-4xl mx-auto grid grid-flow-col items-center  h-[60px]">
        <Link href={"/"} className="cursor-pointer w-fit">
          <Logo size={50} color="#172554" />
        </Link>
        <div className="justify-self-end flex items-center gap-4">
          {session?.user?.role === "ADMIN" && (
            <Link
              href={"/dashboard"}
              className=" cursor-pointer w-fit text-blue-950"
            >
              Dashboard
            </Link>
          )}
          <Link
            href={"/invoices"}
            className=" cursor-pointer w-fit text-blue-950"
          >
            Invoices
          </Link>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
