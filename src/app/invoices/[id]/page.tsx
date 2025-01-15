import { Badge } from "@/components/ui/badge";
import React, { FC } from "react";
import { Ticket } from "@prisma/client";

import SingleInvoiceData from "@/components/single-invoice";
import { getSingleInvoice } from "@/actions/get-single-invoice";

type TicketProps = Ticket & {
  id: string | null;
  name: string;
};

const SingleInvoice = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  if (!id) {
    return <p>Invalid Invoice ID</p>;
  }

  const invoice = await getSingleInvoice(id);

  if (!invoice) {
    return <p>Invoice not found.</p>;
  }

  return <SingleInvoiceData invoice={invoice} />;
};

export default SingleInvoice;
