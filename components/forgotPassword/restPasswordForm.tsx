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
import { toast } from "@/components/ui/use-toast";
import { resetPassword } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
  .object({
    newPassword: z.string().min(6, { message: "كلمة السر يجب ان تكون 6 احرف" }),
    confirmPassword: z
      .string()
      .min(6, { message: "كلمة السر يجب ان تكون 6 احرف" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمة السر غير متطابقة",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof FormSchema>;

type Props = {
  email: string;
  otp: string;
};

function ResetPasswordForm({ email, otp }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      await resetPassword(email, otp, data.newPassword, data.confirmPassword);
      toast({
        title: "تم تغيير كلمة السر بنجاح",
      });
      router.push("/");
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

  useEffect(() => {
    if (!email || !otp) {
      router.push("/auth/forgot-password");
    }
  }, [email, otp]);

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
          انشاء كلمة سر جديدة
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="py-4"
                      type="password"
                      placeholder="كلمه السر"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="اعادة ادخال كلمة السر"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                className="inline-block rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white w-full h-12"
                disabled={isSubmitting}
              >
                تأكيد
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

export default ResetPasswordForm;
