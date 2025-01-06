import React from "react";
import Logo from "./logo";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const Navbar = () => {
  return (
    <div className="border-b border-zinc-100">
      <div className="w-full max-w-4xl mx-auto grid grid-flow-col items-center">
        <Link href={"/"} className="cursor-pointer w-fit">
          <Logo size={50} color="#172554" />
        </Link>
        <Link
          href={"/login"}
          className={`${buttonVariants()} w-fit justify-self-end bg-blue-950  font-semibold capitalize tracking-wider `}
        >
          login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
