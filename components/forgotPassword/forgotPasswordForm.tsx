"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../ui/use-toast";
import { useState } from "react";
import { sendOtp } from "@/services/auth";

type Props = {};

const FormSchema = z.object({
  email: z.string().email({ message: "الرجاء ادخال ايميل صحيح" }),
});

type FormValues = z.infer<typeof FormSchema>;

function ForgotPasswordForm({}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      await sendOtp(data.email);
      toast({
        title: "تم ارسال رمز التحقق الى بريدك الالكتروني",
      });
      router.push("/auth/forgot-password/otp?email=" + data.email);
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
        className="absolute top-0 start-0"
      />
      <div className="w-full">
        <h1 className="text-xl text-[#7B758C] font-bold sm:text-2xl text-center mb-6">
          نسيت كلمة السر ؟
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="py-4"
                      type="email"
                      placeholder="البريد الالكتروني"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                className="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white w-full h-12"
                disabled={isSubmitting}
              >
                ارسال
              </Button>
            </div>
            <div className="text-sm text-[#7B758C]">
              هل هناك مشكله؟ {""}
              <Link href="/contact" className="text-secondary font-bold">
                اتصل بنا
              </Link>{" "}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
