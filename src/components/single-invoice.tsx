"use client";
import { TicketPaid, TicketStatus } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import clsx from "clsx";
import { statusColorMap, statusMap } from "@/utils/constants";
import html2pdf from "html2pdf.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { changeStatusAction } from "@/actions/change-status-action";
import { useSessionStore } from "./store/user-session";
type TicketProps = {
  createdbyName: string | null | undefined;
  name?: string | undefined;
  id?: string | undefined;
  title?: string | undefined;
  desc?: string | undefined;
  status?: TicketStatus | undefined;
  email?: string | undefined;
  createdAt?: Date | undefined;
  value?: number | undefined;
  createdby?: string | undefined;
  paid?: TicketPaid | undefined;
};

const SingleInvoiceData = ({ invoice }: { invoice: TicketProps }) => {
  const [statusTitle, setStatusTitle] = useState(invoice?.status as string);
  const session = useSessionStore((state) => state.session);

  const handleChange = (value: string) => {
    setStatusTitle(value);
  };
  useEffect(() => {
    const ChangeStatus = async () => {
      const res = await changeStatusAction(statusTitle, invoice?.id as string);
    };
    ChangeStatus();
  }, [statusTitle]);

  const handleDownload = () => {
    const element = document.getElementById("invoice-container");
    html2pdf(element, {
      margin: 20,
    });
  };

  return (
    <div id="invoice-container" className="mt-10 text-blue-950 grid gap-y-10 ">
      <div className="grid w-full  grid-flow-col gap-10">
        <div className="grid grid-flow-col gap-4 auto-cols-max ">
          <h1 className="text-3xl font-medium capitalize">{invoice?.title} </h1>
          <Badge
            className={clsx(
              "px-2 py-1 rounded-2xl capitalize min-w-[80px] text-center flex items-center justify-center tracking-wider",
              statusColorMap[invoice?.status!]
            )}
          >
            {invoice?.paid === "PAID" ? "closed" : invoice?.status}
            {/* {invoice?.status}{" "} */}
          </Badge>
        </div>

        <div className=" justify-self-end ">
          {session?.user?.role === "ADMIN" ? (
            <>
              {invoice?.paid !== "PAID" && (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className="capitalize cursor-pointer"
                  >
                    <Button variant={"secondary"}>change status</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {statusMap.map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => handleChange(item?.name)}
                      >
                        <div className="text-sm">{item.name}</div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          ) : (
            <Button
              data-html2canvas-ignore
              onClick={handleDownload}
              variant={"default"}
              className="bg-blue-950 hover:bg-blue-950 capitalize cursor-pointer"
            >
              dowmload invoice
            </Button>
          )}
        </div>
      </div>
      <div className="">
        <p className="text-2xl">$ {invoice?.value} </p>
        <p className="">{invoice?.desc} </p>
      </div>
      <div className="grid gap-y-4">
        <p className="font-semibold capitalize text-xl">billing details</p>
        <div
          style={{ gridTemplateColumns: "auto minmax(auto,1fr)" }}
          className="grid gap-y-3 gap-x-6"
        >
          <p className="capitalize">invoice id</p>
          <p className="">{invoice?.id}</p>
          <p className="capitalize">invoice date</p>
          <p className="">
            {invoice?.createdAt?.toLocaleDateString().slice(0, 10)}
          </p>
          <p className="capitalize">billing name</p>
          <p className="">{invoice?.name} </p>
          <p className="capitalize">billing email</p>
          <p className="">{invoice?.email} </p>
          <p className="capitalize">created by</p>
          <p className="">{invoice?.createdbyName} </p>
        </div>
      </div>
    </div>
  );
};

export default SingleInvoiceData;
