"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { TicketStatus } from "@prisma/client";

export const createInvoiceAction = async (values: {
  value: number;
  email: string;
  name: string;
  desc: string;
  title: string;
  status: TicketStatus;
}) => {
  try {
    const session = await auth();

    if (session?.user?.role !== "ADMIN") {
      console.log("start create invoice action now");
      return { error: "You are not authorized to create invoices" };
    }
    const { name, email, status, desc, value, title } = values;
    await prisma.ticket.create({
      data: {
        title,
        name,
        email,
        status,
        desc,
        value,
        createdby: session?.user?.id as string,
      },
    });
    console.log("Invoice created successfully");
    return { success: "Invoice created successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
