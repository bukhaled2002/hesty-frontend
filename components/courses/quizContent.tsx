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
import { toast } from "@/components/ui/use-toast";
import { getQuizById, submitQuiz } from "@/services/public/quizes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";

const FormSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.string(),
      choiceId: z.string(),
    })
  ),
});

type FormValues = z.infer<typeof FormSchema>;

type Props = {
  courseId: string;
  lectureId: string;
  quizId: string;
};

function QuizContent({ courseId, lectureId, quizId }: Props) {
  const router = useRouter();
  const [timer, setTimer] = useState<number>(0); // in minutes
  const { data: quiz } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuizById(quizId),
  });

  useEffect(() => {
    if (quiz) {
      setTimer(parseInt(quiz.duration));
    }
  }, [quiz]);

  useEffect(() => {
    // if (timer === 0) {
    //   SubmitQuiz(form.getValues());
    // }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 60000);
    return () => clearInterval(interval);
  }, [timer]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      answers: [],
    },
  });

  const { mutate: SubmitQuiz, isPending: isSubmitting } = useMutation({
    mutationFn: (data: FormValues) => submitQuiz(quizId, data.answers),
    onSuccess: () => {
      router.push(
        `/courses/${courseId}/lecture/${lectureId}/quiz/${quizId}/results`
      );
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

  if (!quiz)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-secondary" size={80} />
      </div>
    );
  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <div className="text-lg text-[#121212B2]/70 font-medium flex items-center gap-x-[13px]">
          الاختبار:{" "}
          <span className="text-[#5949BE] text-2xl font-bold">
            {quiz?.title}
          </span>
        </div>
        <div className="text-lg text-[#121212B2]/70 font-medium flex items-center gap-x-[13px]">
          الوقت:{" "}
          <span className="text-[#5949BE] text-2xl font-bold">
            {timer} دقيقة
          </span>
        </div>
        <div className="text-lg text-[#121212B2]/70 font-medium flex items-center gap-x-[13px]">
          عدد الاسئلة:{" "}
          <span className="text-[#5949BE] text-2xl font-bold">
            {quiz?.questions.length}
          </span>
        </div>
      </div>
      <Separator className="my-10" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => SubmitQuiz(data))}>
          {quiz?.questions.map((question, index) => (
            <div key={question.id}>
              <h1 className="text-2xl text-[#000] font-bold mb-[42px]">
                {index + 1}: {question.question}
              </h1>
              <FormField
                key={`answer-${index}`}
                control={form.control}
                name={`answers.${index}.choiceId`}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          form.setValue(
                            `answers.${index}.questionId`,
                            question.id
                          );
                          form.setValue(`answers.${index}.choiceId`, value);
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                        className="flex flex-col"
                      >
                        {question.answers.map((answer) => (
                          <FormItem key={answer.id} className="mb-6">
                            <FormControl>
                              <RadioGroupItem
                                className="me-4"
                                value={answer.id}
                              />
                            </FormControl>
                            <FormLabel className="text-[#141414] text-2xl font-bold cursor-pointer">
                              {answer.text}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className="my-10" />
            </div>
          ))}
          <Button
            size="lg"
            disabled={isSubmitting}
            className="mt-5"
            type="submit"
          >
            {isSubmitting ? "جاري التحميل..." : "تسليم"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default QuizContent;
