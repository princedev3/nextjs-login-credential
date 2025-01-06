"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formForgotPasswordSchema } from "@/utils/auth-schema";
import { useTransition } from "react";
import { reset } from "@/actions/reset";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formForgotPasswordSchema>>({
    resolver: zodResolver(formForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formForgotPasswordSchema>) {
    startTransition(() => {
      reset(values).then((data) => {
        if (data.error) {
          toast({
            title: data.error,
          });
          return;
        }
        if (data.success) {
          toast({
            title: data.success,
          });
          router.push("/confirm-reset-password");
        }
      });
    });
  }
  return (
    <div className="mx-auto grid w-full max-w-2xl mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="w-full text-center">Enter your email</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        autoFocus
                        type="email"
                        placeholder="Enter your email"
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
                  "submit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
