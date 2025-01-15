"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getCustomerInvoices = async () => {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return { error: "User not authenticated" };
  }
  const invoices = await prisma.ticket.findMany({
    where: {
      email,
    },
  });

  return invoices;
};
