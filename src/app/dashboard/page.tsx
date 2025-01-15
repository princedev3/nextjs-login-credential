import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Card } from "@/components/ui/card";
import CreateInvoice from "@/components/create-invoice";
import { getDashboardData } from "@/actions/get-dashboard-data";
import Dashboardcomponent from "@/components/dashboardcomponent";

const DashboardPage = async () => {
  const dashboardListData = await getDashboardData();
  return (
    <div className="mt-10 grid gap-y-6 ">
      <div className="grid grid-flow-col">
        <h1 className="text-2xl font-semibold text-blue-950">Invoices</h1>
        <div className=" justify-self-end">
          <CreateInvoice />
        </div>
      </div>
      <Card className="p-6 rounded-sm ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-lg text-gray-500">
                Date
              </TableHead>
              <TableHead className="text-lg text-gray-500">Name</TableHead>
              <TableHead className="text-lg text-gray-500">Email</TableHead>
              <TableHead className="text-left text-lg text-gray-500">
                Status
              </TableHead>
              <TableHead className="text-left text-lg text-gray-500">
                Value
              </TableHead>
              <TableHead className="text-left text-lg text-gray-500">
                created by
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-gray-500">
            {dashboardListData.data?.map((item: any, index: number) => (
              <Dashboardcomponent item={item} key={index} />
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default DashboardPage;
