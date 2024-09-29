"use client";
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
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { createLectureType } from "@/services/admin/lectures";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createLecture } from "@/services/admin/lectures";
const schema = z.object({
  title: z.string().min(1, { message: "يجب ادخال اسم الدورة" }),
  video: z.object({
    url: z.string().min(1, { message: "يجب ادخال الرابط" }),
    duration: z.string().regex(/^\d+$/, {
      message: "يجب ادخال رقم",
    }),
    count_watched: z.coerce
      .number({
        invalid_type_error: "يجب ادخال رقم",
      })
      .min(0, {
        message: "يجب ادخال رقم اكبر من 0",
      })
      .max(100, {
        message: "يجب ادخال رقم اقل من 100",
      })
      .optional(),
  }),
});

type schemaType = z.infer<typeof schema>;

type Props = {
  intialValues?: createLectureType;
};

function AdminIntialLectureForm({ intialValues }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: intialValues?.title || "",
      video: {
        url: intialValues?.video.url || "",
        duration: intialValues?.video.duration || "",
        count_watched: intialValues?.video.count_watched || 10,
      },
    },
  });
  
  const { mutate: CreateLecture, isPending: isCreating } = useMutation({
    mutationFn: (data: schemaType) => {
      const payload = {
        title: data.title,
        video: {
          url: data.video.url,
          duration: data.video.duration,
          count_watched: data.video.count_watched ?? 10,
        },
      };
      return createLecture(payload);
    },
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures-admin"] });
      toast({
        title: "تم انشاء الحصة بنجاح",
      });
      router.push("/admin/temp-lectures");
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
    <div className="bg-white p-5 rounded-[12px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
              CreateLecture(data);
          })}
          className="mb-0 space-y-[24px] w-full bg-white px-16 pt-14 pb-5"
        >
          <div className="grid grid-cols-4 gap-x-[57px]">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 ">
                  <FormLabel className="text-[#202224] text-lg font-semibold">
                    اسم الحصة
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-secondary bg-[#F5F6F8] h-12 border border-[#00000026]/15 rounded-[4px]"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              name="video.url"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2 ">
                  <FormLabel className="text-[#202224] text-lg font-semibold">
                    رابط الحصة
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-secondary bg-[#F5F6F8] h-12 border border-[#00000026]/15 rounded-[4px]"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-4 gap-x-[57px]">
            <FormField
              name="video.duration"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-[#202224] text-lg font-semibold">
                    مدة الحصة
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-secondary bg-[#F5F6F8] h-12 border border-[#00000026]/15 rounded-[4px]"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              name="video.count_watched"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-[#202224] text-lg font-semibold">
                    عدد مرات المشاهدة
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-secondary bg-[#F5F6F8] h-12 border border-[#00000026]/15 rounded-[4px]"
                      min={0}
                      max={100}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            size="lg"
            variant="secondary"
            className="w-full text-white h-12 text-lg"
            disabled={isCreating}
          >
            انشاء الحصة{" "}
            {(isCreating) && (
              <Loader2 className="animate-spin ms-3" />
            )}{" "}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AdminIntialLectureForm;
