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
import { tokenSchema } from "@/utils/auth-schema";
import { useTransition } from "react";
import { verifyEmail } from "@/actions/verifymail";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const ConfirmPasswordPage = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof tokenSchema>>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      token: "",
    },
  });

  async function onSubmit(values: z.infer<typeof tokenSchema>) {
    try {
      startTransition(() => {
        verifyEmail(values)
          .then((data) => {
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
              router.push("/login");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="grid w-full max-w-2xl mx-auto  mt-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center w-full text-xl tracking-wide">
            Verify your email
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Access Token</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        maxLength={6}
                        placeholder="your enter your personal access token"
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
                  "verify your email"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmPasswordPage;
