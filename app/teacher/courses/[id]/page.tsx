import { getCourse } from "@/services/teacher/courses";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدورات - Teacher",
  description: "الدورات - Teacher في موقع حصتي",
};

type Props = {
  params: {
    id: string;
  };
};

async function TeacherSingleCourse({ params }: Props) {
  const course = await getCourse(params.id);

  return (
    <>
      <h1 className="text-3xl font-bold mb-7">بيانات الكورس</h1>
    </>
  );
}

export default TeacherSingleCourse;
