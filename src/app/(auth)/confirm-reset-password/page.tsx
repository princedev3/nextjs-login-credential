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
import { useState, useTransition } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { confirmResetPasswordToken } from "@/actions/confirm-reset-password-token";
import CreateNewPassword from "@/components/create-new-password";

const ConfirmResetPasswordPage = () => {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState<string | null>("");

  const form = useForm<z.infer<typeof tokenSchema>>({
    resolver: zodResolver(tokenSchema),
    defaultValues: {
      token: "",
    },
  });

  async function onSubmit(values: z.infer<typeof tokenSchema>) {
    try {
      startTransition(() => {
        confirmResetPasswordToken(values).then((response) => {
          if (response.error) {
            toast({
              title: response.error,
            });
            setIsSuccess(false);
          }
          if (response.success) {
            toast({
              title: response.success,
            });
            setEmail(response?.email as string);
            setIsSuccess(true);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="relative  max-w-2xl mx-auto ">
      <Card
        className={`grid w-full max-w-2xl mx-auto mt-10 transition-transform duration-500 ${
          isSuccess
            ? "-translate-x-full opacity-0"
            : "translate-x-0 opacity-100"
        }`}
      >
        <div className="w-full">
          <CardHeader>
            <CardTitle className="text-center w-full text-xl tracking-wide">
              Verify your email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal Access Token</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value || ""}
                          type="text"
                          maxLength={6}
                          placeholder="Enter your personal access token"
                          onChange={(e) => field.onChange(e.target.value)}
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
                    "Verify your email"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </div>
      </Card>

      <div
        className={`absolute top-0 left-0 w-full max-w-2xl mx-auto transition-transform duration-500 ${
          isSuccess ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <Card>
          <div className="w-full mx-auto grid p-3 gap-y-3">
            <h1 className="text-xl font-bold  text-center">
              Enter new password
            </h1>
            <CreateNewPassword email={email as string} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmResetPasswordPage;
