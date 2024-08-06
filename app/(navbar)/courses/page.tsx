import CoursesContent from "@/components/courses/coursesContent";
import CoursesFilter from "@/components/courses/filter";
import { getClasses } from "@/services/public/classes";
import { getCourses } from "@/services/public/courses";
import { getSubjects } from "@/services/subjects";
import { getTeachers } from "@/services/teacher";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدورات",
  description: "الدورات في موقع حصتي",
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function Courses({ searchParams }: Props) {
  const classes = await getClasses();
  const subjects = await getSubjects();
  const teachers = await getTeachers();
  const currentPage = searchParams["page"];
  const name = searchParams["name"];
  const selectedClass = searchParams["class"];
  const selectedSubject = searchParams["subject"];
  const selectedTeacher = searchParams["teacher"];
  const courses = await getCourses(
    currentPage,
    name,
    selectedClass,
    selectedSubject,
    selectedTeacher
  );

  return (
    <div className="container py-10 font-bold text-base space-y-10">
      <div className="title relative w-fit">
        <h1 className="text-[26px] font-bold">كل الدورات</h1>
        <div className="title-underline" />
      </div>
      <div className="grid grid-cols-8 gap-x-6">
        <div className="col-span-2 space-y-5">
          <CoursesFilter
            classes={classes}
            subjects={subjects.data}
            teachers={teachers}
          />
        </div>
        <div className="col-span-6">
          <CoursesContent courses={courses} />
        </div>
      </div>
    </div>
  );
}

export default Courses;
