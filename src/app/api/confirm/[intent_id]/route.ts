// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// type paramProps = { params: { intent_id: string } };

// export const PUT = async (req: NextRequest, { params }: paramProps) => {
//   try {
//     const { intent_id } = params;

//     await prisma.ticket.update({
//       where: { intent_id },
//       data: {
//         paid: "PAID",
//       },
//     });

//     return NextResponse.json({ success: "Payment confirmed" }, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//   }
// };

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Explicitly define the shape of the context parameter
interface RouteContext {
  params: {
    intent_id: string;
  };
}

export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const { intent_id } = context.params;

    if (!intent_id) {
      return NextResponse.json(
        { error: "Intent ID is required" },
        { status: 400 }
      );
    }

    await prisma.ticket.update({
      where: { intent_id },
      data: {
        paid: "PAID",
      },
    });

    return NextResponse.json({ success: "Payment confirmed" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
