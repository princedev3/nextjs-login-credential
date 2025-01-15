"use client";
import React, { useTransition, useState } from "react";
import { Button } from "./ui/button";
import { CirclePlus, LoaderCircle, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ticketSchema } from "@/utils/auth-schema";
import { createInvoiceAction } from "@/actions/create-invoice-action";
import { TicketStatus } from "@prisma/client";
import { toast } from "@/hooks/use-toast";

const CreateInvoice = () => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ticketSchema>>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      name: "",
      status: TicketStatus as any,
      email: "",
      value: 0,
      desc: "",
      title: "",
    },
  });
  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    startTransition(() => {
      createInvoiceAction(values).then((data) => {
        if (data.success) {
          toast({
            title: "Invoice created successfully",
          });
          form.reset();
        }
      });
    });
  }
  return (
    <div>
      <div className="">
        <Button
          onClick={() => setOpen(true)}
          className=" justify-self-end bg-blue-950 hover:bg-blue-950 text-white"
        >
          <CirclePlus /> create Invoice
        </Button>
      </div>
      <div
        className={`${
          open ? "block" : "hidden"
        } absolute top-0 left-0 w-full min-h-screen bg-gray-900 bg-opacity-50  grid place-items-center p-6 z-40`}
      >
        <div className="lg:w-1/2  w-full h-full bg-white rounded-lg justify-self-end my-auto z-50">
          <div className="flex justify-between w-full items-center border-b-[1px] py-2 px-8 ">
            <h1 className="text-xl font-bold text-blue-950">Create Invoice</h1>
            <p
              className=" cursor-pointer border w-fit rounded-full p-1"
              onClick={() => setOpen(false)}
            >
              <X
                className="text-gray-500 cursor-pointer  duration-500"
                size={30}
              />
            </p>
          </div>
          <div className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="enter customer name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="enter ticket title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter customer  email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter the value"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Status</FormLabel>
                        <FormControl className="">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <div className="z-">
                              <SelectTrigger className="w-full ">
                                <SelectValue placeholder="select status" />
                              </SelectTrigger>
                              <SelectContent className=" w-full overflow-hidden ">
                                <SelectGroup>
                                  <SelectLabel>status</SelectLabel>
                                  <SelectItem value="open">Open</SelectItem>
                                  <SelectItem value="pending">
                                    Pending
                                  </SelectItem>
                                  <SelectItem value="closed">Closed</SelectItem>
                                  <SelectItem value="paid">Paid</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </div>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="desc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your message here."
                          id="description"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isPending} type="submit" className="w-full">
                  {isPending ? (
                    <div className="">
                      <LoaderCircle className="animate-spin" size={20} />
                    </div>
                  ) : (
                    "create invoice"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;
