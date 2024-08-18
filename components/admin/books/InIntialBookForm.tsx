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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  updateCourse,
} from "@/services/admin/courses";
import { createBook, GetSingleBookResponse } from "@/services/admin/books";
import { getSubjects } from "@/services/admin/subjects";
import { getTeachers } from "@/services/admin/teachers";
import { getClasses } from "@/services/public/classes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Loader2, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "يجب ادخال اسم الدورة" }),
  description: z.string().min(1, { message: "يجب ادخال الوصف" }),
  img_url: z.string().url({ message: "يجب ادخال رابط صورة الدورة" }), // Made required
  author: z.string().min(1, { message: "يجب وضع اسم المؤلف" }),
  price: z.string().regex(/^\d+$/, {
    message: "يجب ادخال رقم",
  }),
  google_form_url: z.string().min(1, { message: "يجب اضافة رابط التسجيل" }),
  bookChapters: z.array(
    z.object({
      title: z.string().min(1, { message: "يجب ادخال اسم الفصل" }),
      content: z.string().min(1, { message: "يجب ادخال محتوى الفصل" }),
    })
  ).nonempty({ message: "يجب إضافة فصل واحد على الأقل" }),
});

type schemaType = z.infer<typeof schema>;

type Props = {
  intialValues?: GetSingleBookResponse;
};

function AdminIntialBookForm({ intialValues }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const courseId = intialValues?.id;

  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: intialValues?.name || "",
      description: intialValues?.description || "",
      img_url: intialValues?.img_url?.trim() || "", // Ensure img_url is always a string
      author: intialValues?.author || "",
      price: intialValues?.price || "",
      google_form_url: intialValues?.google_form_url || "",
      bookChapters: intialValues?.bookChapters || [{ title: "", content: "" }],
    },
  });
  
  const { fields, append } = useFieldArray({
    control: form.control,
    name: "bookChapters",
  });

  const { mutate: CreateBook, isPending: isCreating } = useMutation({
    mutationFn: (data: schemaType) => createBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books-admin"] });
      toast({
        title: "تم انشاء الكتاب بنجاح",
      });
      router.push("/admin/books");
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

  const { mutate: UpdateCourse, isPending: isUpdating } = useMutation({
    mutationFn: (data: schemaType) => updateCourse(String(courseId), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books-admin"] });
      toast({
        title: "تم تعديل الكتاب بنجاح",
      });
      router.push("/admin/books");
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

  const handleAddChapter = () => {
    append({ title: "", content: "" });
  };

  return (
    <div className="bg-white p-5 rounded-[12px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            const payload = { ...data };
            if (courseId) {
              UpdateCourse(payload);
            } else {
              CreateBook(payload);
            }
          })}
          className="mb-0 space-y-6 w-full bg-white px-16 pt-14 pb-5"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#202224] text-lg font-semibold">
                  اسم الكتاب
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
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#202224] text-lg font-semibold">
                  وصف الكتاب
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="focus-visible:ring-secondary bg-[#F5F6F8] h-[190px] resize-none border border-[#00000026]/15 rounded-[4px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-4 gap-x-[57px]">
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-[#202224] text-lg font-semibold">
                    سعر الكتاب
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
              name="author"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-[#202224] text-lg font-semibold">
                    المؤلف
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
          <FormField
            name="img_url"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="text-[#202224] text-lg font-semibold">
                  صورة الكتاب التعليمي
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
            name="google_form_url"
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="text-[#202224] text-lg font-semibold">
                  رابط التسجيل في الكتاب
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

          {fields.map((chapter, index) => (
            <div key={chapter.id} className="space-y-6">
              <FormField
                name={`bookChapters.${index}.title`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#202224] text-lg font-semibold">
                      اسم الفصل
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
                name={`bookChapters.${index}.content`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#202224] text-lg font-semibold">
                      محتوى الفصل
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="focus-visible:ring-secondary bg-[#F5F6F8] h-[190px] resize-none border border-[#00000026]/15 rounded-[4px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            type="button"
            className="me-5 group bg-[#E4E0FF] hover:bg-[#4635B7] text-[#4635B7] hover:text-[#E4E0FF] border border-[#7864FF] font-bold"
            onClick={handleAddChapter}
          >
            <PlusIcon className="w-5 h-5 me-[6px] bg-[#4635B7] group-hover:bg-[#E4E0FF] rounded-full text-[#E4E0FF] group-hover:text-[#4635B7]" />
            اضافة فصل جديد
          </Button>

          <Button
            type="submit"
            size="lg"
            variant="secondary"
            className="w-full text-white h-12 text-lg"
            disabled={isCreating || isUpdating}
          >
            {courseId ? "تعديل" : "انشاء"}
            {(isCreating || isUpdating) && (
              <Loader2 className="animate-spin ms-3" />
            )}{" "}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AdminIntialBookForm;
