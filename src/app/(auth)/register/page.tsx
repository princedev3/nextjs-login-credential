"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import Link from "next/link";
import { formRegisterSchema } from "@/utils/auth-schema";
import { toast } from "@/hooks/use-toast";
import { registerAction } from "@/actions/register-action";
import { useTransition } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formRegisterSchema>) {
    startTransition(() => {
      registerAction(values).then((data) => {
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
          router.push("/confirm-email");
          form.reset();
        }
      });
    });
  }

  return (
    <div className="grid w-full max-w-2xl mx-auto  mt-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center capitalize">
            create account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="your enter name" {...field} />
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
                        type="email"
                        placeholder="your enter email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="your enter Password"
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
                  "Register"
                )}
              </Button>
              <Link
                href="/login"
                className="text-sm text-gray-700 flex justify-center items-center underline text-center w-full cursor-pointer"
              >
                Don't have an account?Login
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
