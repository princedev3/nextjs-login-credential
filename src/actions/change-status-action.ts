"use server";

import prisma from "@/lib/prisma";
import { TicketStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const changeStatusAction = async (status: string, id: string) => {
  try {
    if (!status || !id) {
      return { error: "Please provide status and id" };
    }
    const res = await prisma.ticket.update({
      where: { id: id },
      data: { status: status as TicketStatus },
    });
    revalidatePath(`/invoices/${id}`);
    return { success: true, data: res };
  } catch (error) {
    console.log(error);
    return { error: "Error changing status" };
  }
};
