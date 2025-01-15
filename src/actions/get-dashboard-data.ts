import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getDashboardData = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return { error: "User not authenticated" };
    }
    const dashboardListData = await prisma.ticket.findMany();
    const createdByIds = dashboardListData.map((ticket) => ticket.createdby);
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: createdByIds,
        },
      },
      select: {
        name: true,
        id: true,
      },
    });
    const ticketWithUser = dashboardListData.map((ticket) => {
      const user = users.find((user) => user.id === ticket.createdby);
      return {
        ...ticket,
        createdByName: user?.name,
      };
    });

    return { data: ticketWithUser };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
