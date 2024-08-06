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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { getAllChapters } from "@/services/admin/courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  selectedLecture: z.string().nonempty({ message: "برجاء اختيار الدرس" }),
});

type FormValues = z.infer<typeof FormSchema>;

type Props = {
  courseId: string | string[] | undefined;
};

function ChooseLecture({ courseId }: Props) {
  const router = useRouter();
  const { data: chapters, isLoading } = useQuery({
    queryKey: ["chapters", courseId],
    queryFn: () => getAllChapters(courseId as string),
  });
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedLecture: "",
    },
  });
  useEffect(() => {
    if (chapters) {
      if (chapters.length === 0) {
        toast({
          variant: "destructive",
          title: "لا يوجد دروس لهذا الكورس",
        });
        router.push(`/admin/courses`);
      }
    }
  }, [chapters]);
  if (!chapters)
    return (
      <div className=" flex items-center justify-center">
        <Loader2 className="animate-spin text-secondary" size={50} />
      </div>
    );
  return (
    <div className="bg-white p-10 rounded-[12px]">
      <h1 className="text-2xl font-bold">برجاء تحديد الدرس</h1>
      <h2 className="text-[#121212B2]/70 text-lg font-semibold mb-4">
        اختر الدرس الذي ترغب في اضافة الاختبار اليه
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            router.push(
              `/admin/courses/${courseId}/choose-lecture/${data.selectedLecture}/create-quiz`
            )
          )}
        >
          <FormField
            control={form.control}
            name="selectedLecture"
            render={({ field }) => (
              <FormItem className="space-y-3 mb-5">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {chapters.map((chapter) => {
                      return (
                        <div
                          key={chapter.id}
                          className="border border-[#1212121A] rounded p-4 mb-4"
                        >
                          <h1 className="text-xl font-bold mb-5">
                            {chapter.name}
                          </h1>
                          <div className="flex flex-col space-y-4">
                            {chapter.lectures.map((lecture) => {
                              return (
                                <FormItem
                                  key={lecture.id}
                                  className="flex items-center justify-between border border-[#1212121A] rounded space-y-0 "
                                >
                                  <FormLabel className="text-lg font-semibold flex-1 p-4 cursor-pointer">
                                    {lecture.title}
                                  </FormLabel>
                                  <FormControl>
                                    <RadioGroupItem
                                      className="me-4"
                                      value={lecture.id}
                                    />
                                  </FormControl>
                                </FormItem>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              size="lg"
              type="submit"
              disabled={isLoading || !form.formState.isDirty}
            >
              {isLoading ? "جاري التحميل..." : "التالي"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ChooseLecture;
