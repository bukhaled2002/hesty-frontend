"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { payCourse } from "@/services/public/checkout";
import { toast } from "../ui/use-toast";
import { isAxiosError } from "axios";

type Props = {
  courseId: string;
};

function PayForm({ courseId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handlePay = async () => {
    setIsLoading(true);
    try {
      await payCourse(courseId);
      setIsLoading(false);
      toast({
        title: "تم الدفع بنجاح",
      });
      router.push(`/courses/${courseId}`);
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: error.response?.data.message || "حدث خطأ ما",
          variant: "destructive",
        });
      } else {
        toast({
          title: "حدث خطأ ما",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        disabled={isLoading}
        onClick={handlePay}
        className="px-6 text-lg rounded-lg w-full sm:py-7 py-3"
      >
        {isLoading ? "جاري الدفع..." : "ادفع الآن"}
      </Button>
    </div>
  );
}

export default PayForm;
