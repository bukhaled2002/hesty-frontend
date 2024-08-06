import TeacherIntialCourseForm from "@/components/teacher/courses/InIntialCourseForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اضافة دورة جديدة - معلم",
  description: "اضافة دورة جديدة - معلم في موقع حصتي",
};

type Props = {};

function TeacherCourseCreate({}: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold">اضافة دورة جديدة</h1>
      <h2 className="text-[#121212B2]/70 text-lg font-semibold mb-4">
        من فضلك قم بمليء جميع تفاصيل المادة
      </h2>
      <TeacherIntialCourseForm />
    </div>
  );
}

export default TeacherCourseCreate;
