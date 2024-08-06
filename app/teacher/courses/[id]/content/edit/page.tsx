import TeacherCourseContentForm from "@/components/teacher/courses/courseContentForm";
import { getAllChapters } from "@/services/teacher/courses";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

async function TeacherCourseLectureEdit({ params }: Props) {
  const courseId = params.id;
  const chapters = await getAllChapters(courseId);

  return (
    <div>
      <h1 className="text-2xl font-bold">اضافة دورة جديدة</h1>
      <h2 className="text-[#121212B2]/70 text-lg font-semibold mb-4">
        من فضلك قم بمليء جميع تفاصيل المادة
      </h2>
      <TeacherCourseContentForm courseIdSlug={courseId} />
    </div>
  );
}

export default TeacherCourseLectureEdit;
