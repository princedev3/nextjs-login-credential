"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useSessionStore } from "../store/user-session";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChevronDown } from "lucide-react";

import { logout } from "@/actions/logout-action";

export const UserButton = () => {
  const pathname = usePathname();
  const session = useSessionStore((state) => state.session);
  const user = session?.user;
  const nameAbrev = user?.name?.split("").splice(0, 2).join("");

  const router = useRouter();
  const handleLogout = async () => {
    const res = await logout();
    router.push("/login");
  };
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            asChild
            variant={"outline"}
            className="rounded-full outline-none focus:outline-none"
          >
            <span className="flex space-x-2">
              <Avatar className="size-8">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback className="uppercase">
                  {nameAbrev}
                </AvatarFallback>
              </Avatar>

              <div className="xl:flex flex-col justify-end hidden">
                <span>{user?.name}</span>
                <span className="line-clamp-1 text-xs text-gray-600">
                  {user?.email}
                </span>
              </div>
              <div>
                <ChevronDown className="w-4 h-4" />
              </div>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <Button size={"lg"} asChild className="!bg-blue-950">
      <Link href={pathname?.endsWith("/login") ? "/register" : "/login"}>
        {pathname?.endsWith("/login") ? "register" : "Log In"}
      </Link>
    </Button>
  );
};
