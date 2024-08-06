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
import { addSon } from "@/services/parent/sons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  studentPhone: z.string().min(1, { message: "يجب ادخال رقم الهاتف" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

function ParentAddSonForm() {
  const router = useRouter();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentPhone: "",
    },
  });

  const { mutate: AddSon, isPending: isAdding } = useMutation({
    mutationFn: (data: FormSchemaType) => addSon(data),
    onSuccess: () => {
      toast({
        title: "تم اضافة الابن بنجاح",
      });
      router.push("/parent/sons");
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast({
          title: error.response?.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "حدث خطأ ما",
          variant: "destructive",
        });
      }
    },
  });

  return (
    <div className=" bg-white py-12 rounded-[12px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            AddSon(data);
          })}
          className="mx-auto mb-0 mt-8 max-w-lg space-y-[18px] w-full bg-white"
        >
          <FormField
            name="studentPhone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="focus-visible:ring-secondary"
                    placeholder="اضافة رقم الهاتف"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="lg"
            variant="secondary"
            className="w-full text-white h-12 text-lg"
            disabled={isAdding}
          >
            {isAdding ? "جاري الاضافة" : "اضافة الابن"}{" "}
            {isAdding && <Loader2 className="animate-spin ms-3" />}{" "}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ParentAddSonForm;
