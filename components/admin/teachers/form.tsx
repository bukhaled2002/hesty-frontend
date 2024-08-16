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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  GetSingleTeacherResponse,
  TCreateTeacher,
  TUpdateTeacher,
  createTeacher,
  getTeacher,
  updateTeacher,
} from "@/services/admin/teachers";
import { getSubjects } from "@/services/subjects";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { transformGoogleDriveUrl } from "@/lib/helper/ExtractImg";
type Props = {
  teacher?: GetSingleTeacherResponse;
  id?: string;
};

const teachersAdminSchemaCreate = z
  .object({
    fullName: z.string().min(1, { message: "يجب ادخال الاسم" }),
    info: z.string().min(1, { message: "يجب ادخال المعلومات" }),
    email: z.string().email({ message: "يجب ادخال بريد الكتروني صحيح" }),
    password: z
      .string()
      .min(6, { message: "كلمة السر يجب ان تكون 6 احرف على الاقل" }),
    password_confirmation: z.string(),
    img_url: z.string().url({ message: "يجب ادخال رابط صورة صحيح" }).optional(),
    phone: z.string().min(1, { message: "يجب ادخال رقم الهاتف" }),
    city: z.string().min(1, { message: "يجب ادخال المدينة" }),
    subjectId: z.string().min(1, { message: "يجب اختيار المادة" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "كلمة السر غير متطابقة",
  });

const teachersAdminSchemaUpdate = z.object({
  fullName: z.string().min(1, { message: "يجب ادخال الاسم" }),
  info: z.string().min(1, { message: "يجب ادخال المعلومات" }),
  email: z.string().email({ message: "يجب ادخال بريد الكتروني صحيح" }),
  img_url: z.string().url({ message: "يجب ادخال رابط صورة الدورة" }).optional(),
  phone: z.string().min(1, { message: "يجب ادخال رقم الهاتف" }),
  city: z.string().min(1, { message: "يجب ادخال المدينة" }),
  subjectId: z.string().min(1, { message: "يجب اختيار المادة" }),
});

function AdminTeachersForm({ id }: Props) {
  const { data: teacher } = useQuery({
    queryKey: ["teacher-admin", id],
    queryFn: () => (id ? getTeacher(id as string) : null),
  });
  const teacherId = id;
  const schema = teacherId
    ? teachersAdminSchemaUpdate
    : teachersAdminSchemaCreate;
  type TeachersAdminSchemaType = z.infer<
    typeof teacherId extends string
      ? typeof teachersAdminSchemaUpdate
      : typeof teachersAdminSchemaCreate
  >;

  const { data: subjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  });
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<TeachersAdminSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: teacher?.fullName || "",
      email: teacher?.email || "",
      password: "",
      password_confirmation: "",
      phone: teacher?.phone || "",
      city: teacher?.city || "",
      subjectId: teacher?.subject.id || "",
      img_url: teacher?.img_url?.trim() || "",
      info: teacher?.info || "",
    },
  });

  const { mutate: CreateTeacher, isPending: isCreating } = useMutation({
    mutationFn: (data: TCreateTeacher) => createTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers-admin"] });
      toast({
        title: "تم انشاء الحساب بنجاح",
      });
      router.push("/admin/teachers");
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

  const { mutate: UpdateTeacher, isPending: isUpdating } = useMutation({
    mutationFn: (data: TUpdateTeacher) =>
      updateTeacher(String(teacherId), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers-admin"] });
      toast({
        title: "تم تعديل الحساب بنجاح",
      });
      router.push("/admin/teachers");
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

  useEffect(() => {
    if (teacher) {
      form.reset({
        fullName: teacher.fullName,
        email: teacher.email,
        phone: teacher.phone,
        city: teacher.city,
        subjectId: teacher.subject.id,
        img_url: teacher.img_url?.trim(),
        info: teacher.info,
      });
    }
  }, [teacher]);

  if (!subjects || (!teacher && id))
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-secondary" />
      </div>
    );
  return (
    <div className=" bg-white py-12 rounded-[12px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            const { password_confirmation, ...rest } = data;
            teacherId ? UpdateTeacher(rest) : CreateTeacher(rest);
          })}
          className="mx-auto mb-0 mt-8 max-w-lg space-y-[18px] w-full bg-white"
        >
          <div className="image w-fit m-auto mb-5 md:mb-10">
            <Image
              src={transformGoogleDriveUrl(teacher?.img_url) || "/images/camera.svg"}
              alt="Profile Picture"
              width={150}
              height={150}
              className="rounded-full object-cover w-36 h-36"
              loading="eager"
            />
          </div>
          <FormField
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="focus-visible:ring-secondary"
                    placeholder="الأسم كامل"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="focus-visible:ring-secondary"
                    placeholder="البريد الالكتروني"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="focus-visible:ring-secondary"
                    placeholder="رقم الهاتف"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="focus-visible:ring-secondary border-[1.5px] border-black border-opacity-40 placeholder:text-[#808080B2] resize-none"
                    placeholder="المعلومات"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subjectId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="focus-visible:ring-secondary">
                      <SelectValue placeholder="المادة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {subjects?.data.map((subject) => {
                      return (
                        <SelectItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="focus-visible:ring-secondary"
                    placeholder="المدينة"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            name="img_url"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="focus-visible:ring-secondary"
                    placeholder="ادخل رابط الصورة"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {!teacher?.id && (
            <div className="grid grid-cols-4 gap-x-[18px]">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input
                        className="focus-visible:ring-secondary"
                        placeholder="كلمة السر"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <div className="mt-3">
                      {form?.formState?.errors?.password?.type && (
                        <FormMessage className="text-red-500" />
                      )}
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name="password_confirmation"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormControl>
                      <Input
                        className="focus-visible:ring-secondary"
                        placeholder="تأكيد كلمة السر"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <div className="flex justify-between items-center mt-3">
                      {form?.formState?.errors?.password_confirmation?.type && (
                        <FormMessage className="text-red-500" />
                      )}
                    </div>
                  </FormItem>
                )}
              />
            </div>
          )}
          <Button
            type="submit"
            size="lg"
            variant="secondary"
            className="w-full text-white h-12 text-lg"
            disabled={isCreating || isUpdating}
          >
            {teacherId ? "تعديل" : "انشاء"}
            {(isCreating || isUpdating) && (
              <Loader2 className="animate-spin ms-3" />
            )}{" "}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AdminTeachersForm;
