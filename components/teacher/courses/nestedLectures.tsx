import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusIcon, XIcon } from "lucide-react";
import { useFieldArray } from "react-hook-form";

type Props = {
  chapterIndex: number;
  form: any;
  setLecturesToDelete: React.Dispatch<React.SetStateAction<string[]>>;
};

function TeacherNestedLectures({
  chapterIndex: index,
  form,
  setLecturesToDelete,
}: Props) {
  const {
    fields: lectureFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: `chapters.${index}.lectures`,
    keyName: "key",
  });

  return lectureFields.map((lecture, lessonIndex) => {
    return (
      <div key={lecture.key}>
        <div className="grid gap-5 md:grid-cols-4 relative mb-6">
          <FormField
            name={`chapters.${index}.lectures.${lessonIndex}.title`}
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
            name={`chapters.${index}.lectures.${lessonIndex}.video.url`}
            control={form.control}
            render={({ field }) => (
              <FormItem className="col-span-2 ">
                <FormLabel className="text-[#202224] text-lg font-semibold">
                  رابط الفيديو الخاص بالحصة
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
            name={`chapters.${index}.lectures.${lessonIndex}.video.count_watched`}
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="col-span-2 ">
                  <FormLabel className="text-[#202224] text-lg font-semibold">
                    عدد المشاهدات
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-secondary bg-[#F5F6F8] h-12 border border-[#00000026]/15 rounded-[4px]"
                      type="number"
                      min={0}
                      {...field}
                      value={String(field.value)}
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              );
            }}
          />
          {lectureFields.length > 1 && (
            <XIcon
              className="w-5 h-5 cursor-pointer absolute top-0 end-0 text-[#202224] hover:text-red-500"
              onClick={() => {
                remove(lessonIndex);
                // @ts-ignore
                lectureFields[lessonIndex].id &&
                  setLecturesToDelete((prev) => [
                    ...prev,
                    // @ts-ignore
                    lectureFields[lessonIndex].id,
                  ]);
              }}
            />
          )}
        </div>
        {lectureFields.length - 1 === lessonIndex && (
          <Button
            type="button"
            onClick={() => append({ title: "", video: { url: "" } })}
            className="group bg-transparent hover:bg-[#6F6F6F] text-[#202224] hover:text-white border border-[#202224] font-bold"
          >
            <PlusIcon className="w-5 h-5 me-[6px] bg-[#6F6F6F] group-hover:bg-white rounded-full text-white group-hover:text-[#202224]" />
            اضافة حصة جديدة
          </Button>
        )}
      </div>
    );
  });
}

export default TeacherNestedLectures;
