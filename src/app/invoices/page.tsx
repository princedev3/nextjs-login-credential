import { getCustomerInvoices } from "@/actions/getCustomerInvoices";
import CustomerInvoices from "@/components/customer-invoices";
import React from "react";

const InvoicePage = async () => {
  const invoices = await getCustomerInvoices();

  return <CustomerInvoices invoices={invoices} />;
};

export default InvoicePage;
