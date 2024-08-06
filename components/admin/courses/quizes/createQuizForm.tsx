"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import AdminNestedQuizQuestions from "./quiz-questions";
import { toast } from "@/components/ui/use-toast";
import { isAxiosError } from "axios";
import { createQuiz } from "@/services/quiz";

const FormSchema = z.object({
  title: z.string().nonempty("اسم الامتحان مطلوب"),
  duration: z.string().nonempty("الوقت مطلوب"),
  questions: z.array(
    z.object({
      question: z.string().nonempty("السؤال مطلوب"),
      figure: z.array(z.string()),
      choices: z
        .array(
          z.object({
            answer: z.string().nonempty("الاجابة مطلوبة"),
            isCorrect: z.boolean(),
          })
        )
        .refine(
          (choices) => {
            const correctChoices = choices.filter((choice) => choice.isCorrect);
            return correctChoices.length === 1;
          },
          {
            message: "يجب ان يكون اختيار واحد صحيح",
          }
        ),
    })
  ),
});

type FormValues = z.infer<typeof FormSchema>;

type Props = {
  courseId: string | string[] | undefined;
  lectureId: string | string[] | undefined;
};

function AdminCreateQuizeForm({ courseId, lectureId }: Props) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      duration: "",
      questions: [
        {
          question: "",
          figure: [],
          choices: [
            {
              answer: "",
              isCorrect: false,
            },
            {
              answer: "",
              isCorrect: false,
            },
          ],
        },
      ],
    },
  });
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  function addQuestion() {
    appendQuestion({
      question: "",
      figure: [],
      choices: [
        {
          answer: "",
          isCorrect: false,
        },
        {
          answer: "",
          isCorrect: false,
        },
      ],
    });
  }

  useEffect(() => {
    if (!courseId || !lectureId) {
      router.push(`/admin/courses`);
    }
  }, [courseId, lectureId]);

  async function onSubmit(data: FormValues) {
    const newData = {
      ...data,
      lectureId: lectureId as string,
    };
    try {
      await createQuiz(newData);
      toast({
        title: "تم انشاء الامتحان بنجاح",
      });
      router.push(`/admin/courses`);
    } catch (error) {
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
    }
  }

  return (
    <div className="bg-white p-10 rounded-[12px]">
      <div className="mb-7">
        <h1 className="text-2xl font-bold">برجاء اضافة الاسئلة</h1>
        <h2 className="text-[#121212B2]/70 text-lg font-semibold mb-[28.5px]">
          برجاء تحديد الدورة التعليمية والفصل والدرس الذي سيتم اجراء امتحان خاص
          بهم
        </h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-[665px] m-auto">
            <Separator className="my-6 h-1 w-[600px] m-auto rounded-lg mb-[41.5px]" />
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel
                    className={cn(
                      "text-[#202224] text-lg font-semibold",
                      form.formState.errors?.title && "text-red-500"
                    )}
                  >
                    اسم الامتحان
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-secondary bg-[#F5F6F8] h-12 border border-[#00000026]/15 rounded-[4px]"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="duration"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className={cn(
                      "text-[#202224] text-lg font-semibold",
                      form.formState.errors?.duration && "text-red-500"
                    )}
                  >
                    وقت الامتحان
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-secondary bg-[#F5F6F8] h-12 border border-[#00000026]/15 rounded-[4px]"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {questionFields.map((question, index) => {
            return (
              <div key={question.id}>
                <Separator className="h-1 w-[600px] m-auto rounded-lg my-[74px]" />
                <div className="flex items-end gap-x-5 mb-5">
                  <FormField
                    name={`questions.${index}.question`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel
                          className={cn(
                            "text-[#202224] text-lg font-semibold mb-5",
                            form.formState.errors?.questions?.[index]
                              ?.question && "text-red-500"
                          )}
                        >
                          عنوان السؤال
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="focus-visible:ring-secondary bg-[#F5F6F8] h-12 border border-[#00000026]/15 rounded-[4px]"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {questionFields.length > 1 && (
                    <Button
                      onClick={() => removeQuestion(index)}
                      type="button"
                      className="group bg-red-500 hover:bg-red-700 text-white border border-red-600 font-bold"
                    >
                      <Trash2 className="w-5 h-5 me-[6px] rounded-full text-white" />
                      حذف السؤال
                    </Button>
                  )}
                </div>
                <FormField
                  name={`questions.${index}.figure`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel
                        className={cn(
                          "text-[#202224] text-lg font-semibold mb-5",
                          form.formState.errors?.questions?.[index]?.figure &&
                            "text-red-500"
                        )}
                      >
                        Figure
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="focus-visible:ring-secondary bg-[#F5F6F8] h-12 border border-[#00000026]/15 rounded-[4px]"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <AdminNestedQuizQuestions
                  key={index}
                  choiceIndex={index}
                  form={form}
                />
                {index === questionFields.length - 1 && (
                  <div className="flex justify-between gap-x-5">
                    <Button
                      onClick={addQuestion}
                      type="button"
                      className="group bg-[#E4E0FF] hover:bg-[#4635B7] text-[#4635B7] hover:text-[#E4E0FF] border border-[#7864FF] font-bold"
                    >
                      <PlusIcon className="w-5 h-5 me-[6px] bg-[#4635B7] group-hover:bg-[#E4E0FF] rounded-full text-[#E4E0FF] group-hover:text-[#4635B7]" />
                      اضافة سؤال
                    </Button>
                    <Button
                      variant="secondary"
                      className="text-white"
                      type="submit"
                    >
                      انشاء الامتحان
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </form>
      </Form>
    </div>
  );
}

export default AdminCreateQuizeForm;
