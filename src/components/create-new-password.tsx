"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CardContent } from "./ui/card";
import { changePassword } from "@/actions/change-password";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const passwordSchema = z.object({
  password: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  confirmPassword: z.string().min(5, {
    message: "Username must be at least 2 characters.",
  }),
});

const CreateNewPassword = ({ email }: { email: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof passwordSchema>) {
    startTransition(() => {
      changePassword({ ...values, email }).then((data) => {
        if (data.success) {
          toast({ title: "Password changed successfully" });
          router.push("/login");
        }
        if (data.error) {
          toast({ title: data.error });
          return;
        }
      });
    });
  }
  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="new password"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="confirm password"
                    type="password"
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
              "change password"
            )}
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};

export default CreateNewPassword;
