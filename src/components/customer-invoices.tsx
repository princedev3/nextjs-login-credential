"use client";
import { columns } from "@/utils/columns";
import { DataTable } from "@/utils/data-table";
import { Ticket } from "@prisma/client";
import React from "react";

type CustomerInvoicesProps =
  | Ticket[]
  | {
      error: string | null;
    };
const CustomerInvoices = ({
  invoices,
}: {
  invoices: CustomerInvoicesProps;
}) => {
  if ("error" in invoices) {
    return <div>{invoices.error}</div>;
  }
  return (
    <div className="text-blue-950 mt-5">
      <DataTable columns={columns} data={invoices} />
    </div>
  );
};

export default CustomerInvoices;
