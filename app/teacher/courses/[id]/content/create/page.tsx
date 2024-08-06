import TeacherCourseContentForm from "@/components/teacher/courses/courseContentForm";

type Props = {
  params: {
    id: string;
  };
};

async function TeacherCourseLectureCreate({ params }: Props) {
  const courseId = params.id;

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

export default TeacherCourseLectureCreate;
