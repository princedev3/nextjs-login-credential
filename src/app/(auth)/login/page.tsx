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
import { formLoginSchema } from "@/utils/auth-schema";
import { useTransition } from "react";
import { loginAction } from "@/actions/login-action";
import { toast } from "@/hooks/use-toast";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formLoginSchema>) {
    startTransition(() => {
      loginAction(values).then((data) => {
        if (
          data?.error &&
          data?.error === "Email not verified. Please check your email."
        ) {
          toast({ title: data.error });
          router.push("/confirm-email");
          return;
        }
        if (data?.error) {
          toast({ title: data.error });
          return;
        }
        if (data.success) {
          toast({ title: data.success });
          router.push("/");
        }
      });
    });
  }

  return (
    <div className="grid w-full max-w-2xl mx-auto  mt-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center w-full text-xl tracking-wide">
            Login
          </CardTitle>
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
                        type="email"
                        placeholder="your enter email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="">
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
                <Link
                  href={"/forgot-password"}
                  className="text-gray-600 text-sm cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? (
                  <div className="">
                    <LoaderCircle className="animate-spin" size={20} />
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
              <Link
                href="/register"
                className="text-sm text-gray-700 flex justify-center items-center underline text-center w-full cursor-pointer"
              >
                have an account?Register
              </Link>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
