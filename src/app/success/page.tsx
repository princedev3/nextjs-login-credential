"use client";
import { toast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { BounceLoader } from "react-spinners";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const intentId = searchParams.get("payment_intent");
  const router = useRouter();
  useEffect(() => {
    const makeRequest = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/confirm?intent_id=${intentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        toast({
          title: "Payment Success",
        });
        router.push("/invoices");
      }
      if (data.error) {
        toast({
          title: "Payment Failed",
        });
      }
    };
    makeRequest();
  }, [intentId, router]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mx-auto grid place-items-center text-blue-950">
        <h1 className="">Payment Success</h1>
        <p>
          Thank you for your payment. Your invoice will be sent to your email.
        </p>
        <BounceLoader className="" size={100} color={"#172554"} />
      </div>
    </Suspense>
  );
};

export default SuccessPage;
