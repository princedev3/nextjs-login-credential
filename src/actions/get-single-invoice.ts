"use server";

import prisma from "@/lib/prisma";

export const getSingleInvoice = async (id: string) => {
  try {
    const invoice = await prisma.ticket.findUnique({
      where: {
        id: id,
      },
    });
    const invoiceUser = await prisma.user.findUnique({
      where: {
        id: invoice?.createdby,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return { ...invoice, createdbyName: invoiceUser?.name };
  } catch (error) {
    console.log(error);
  }
};
