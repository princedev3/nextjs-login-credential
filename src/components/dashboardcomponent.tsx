"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Ticket } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { statusColorMap } from "@/utils/constants";
import { useSessionStore } from "./store/user-session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type DashboardcomponentProps = Ticket & {
  createdByName: string;
};

const Dashboardcomponent = ({ item }: { item: DashboardcomponentProps }) => {
  const router = useRouter();
  // #fcba03  #68bd1e  #bd1e4e   #1e6dbd
  const session = useSessionStore((state) => state.session);
  useEffect(() => {
    if (session?.user?.role !== "ADMIN") {
      router.push("/invoices");
    }
  }, [session, router]);
  return (
    <TableRow className="cursor-pointer hover:bg-gray-100 ">
      <TableCell className="font-medium ">
        <Link
          href={`/invoices/${item.id}`}
          className="block w-full h-full py-[10px] "
        >
          {item.createdAt.toString().slice(0, 10)}
        </Link>
      </TableCell>
      <TableCell className="font-medium">
        <Link href={`/invoices/${item.id}`} className="block w-full h-full">
          {item.name}
        </Link>
      </TableCell>
      <TableCell className="font-medium">
        <Link href={`/invoices/${item.id}`} className="block w-full h-full">
          {item.email}
        </Link>
      </TableCell>
      <TableCell className="font-medium text-left">
        <Link href={`/invoices/${item.id}`} className="block w-full h-full">
          <Badge
            className={clsx("px-2 py-1 rounded", statusColorMap[item?.status])}
          >
            {item.paid === "PAID" ? "closed" : item.status}
          </Badge>
        </Link>
      </TableCell>
      <TableCell className="font-medium text-left">
        <Link href={`/invoices/${item.id}`} className="block w-full h-full">
          {item.value.toFixed(2)}
        </Link>
      </TableCell>
      <TableCell className="font-medium text-left">
        <Link href={`/invoices/${item.id}`} className="block w-full h-full">
          {item.createdByName}
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default Dashboardcomponent;
