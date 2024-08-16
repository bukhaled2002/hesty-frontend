"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { resendOtp, verifyOtp } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  otp: z.string().min(5),
});

type FormValues = z.infer<typeof FormSchema>;

type Props = {
  email: string;
};

function OtpForm({ email }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timer, setTimer] = useState(59);
  const router = useRouter();
  const resendOTP = async () => {
    try {
      await resendOtp(email);
      toast({
        title: "تم اعادة ارسال رمز التحقق",
      });
      setTimer(59);
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: error.response?.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "خطأ",
          description: "حدث خطأ ما",
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (!email) {
      router.push("/auth/forgot-password");
    }
  }, [email]);

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      await verifyOtp(email, data.otp);
      toast({
        title: "تم تأكيد رمز التحقق",
      });
      router.push(`/auth/reset-password?email=${email}&OTP=${data.otp}`);
    } catch (error) {
      if (isAxiosError(error)) {
        toast({
          title: error.response?.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "خطأ",
          description: "حدث خطأ ما",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <Image
        src="/logo.svg"
        alt="logo"
        width={150}
        height={150}
        className="absolute top-0 start-0 sm:size-[150px] size-[100px]"
      />
      <div className="w-full">
        <h1 className="text-xl text-[#7B758C] font-bold sm:text-2xl text-center mb-6">
          ادخال رمز التأكيد
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      render={({ slots }) => (
                        <InputOTPGroup dir="ltr" className="gap-2">
                          {slots.map((slot, index) => (
                            <InputOTPSlot
                              key={index}
                              className={cn(
                                "rounded-md border text-2xl",
                                form.formState.errors.otp && "border-red-500"
                              )}
                              {...slot}
                            />
                          ))}{" "}
                        </InputOTPGroup>
                      )}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                className=" inline-block rounded-lg bg-primary px-5 py-3 text-base font-medium text-white w-full sm:h-14 h-10"
                disabled={isSubmitting}
              >
                تاكيد
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm text-secondary font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={resendOTP}
                disabled={timer > 0}
              >
                اعادة ارسال الرمز
              </button>
              {timer > 0 && (
                <div className="text-sm text-secondary font-bold">
                  {Math.floor(timer / 60)}:{timer % 60}
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default OtpForm;
