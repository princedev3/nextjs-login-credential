"use client";

import { TicketStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
export type InvoiceType = {
  id: string;
  value: number;
  status: TicketStatus;
  email: string;
  paid: string;
  createdAt: Date;
};

export const columns: ColumnDef<InvoiceType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <p className="">{row.original.id.slice(0, 9)} </p>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "paid",
    header: "Paid",
    cell: ({ row }) => <p style={{ fontSize: "11px" }}>{row.original.paid} </p>,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "value",
    header: "Value ($)",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => (
      <p className="">
        {new Date(row.original.createdAt).toLocaleString().slice(0, 9)}
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="text-blue-950">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-blue-950 hover:text-blue-950"
              onClick={() => {
                toast({ title: "Payment ID copied to clipboard" }),
                  navigator.clipboard.writeText(payment.id);
              }}
            >
              Copy payment ID
            </DropdownMenuItem>
            {payment.paid !== "PAID" && (
              <DropdownMenuItem className="text-blue-950 hover:text-blue-950">
                <Link href={`/pay/${payment.id}`}>pay invoice</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-blue-950 hover:text-blue-950">
              <Link href={`/invoices/${payment.id}`}>View payment details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
