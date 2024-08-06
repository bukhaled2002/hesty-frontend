import { getCourses } from "@/services/public/courses";
import Link from "next/link";
import CourseCardOne from "../cards/courseCard-1";

type Props = {};

async function Courses({}: Props) {
  const courses = await getCourses();

  return (
    <div className="container py-10 space-y-14">
      <div className="header flex items-center justify-between">
        <div className="title relative w-fit">
          <h1 className="text-[26px] font-bold">الدورات المتاحة</h1>
          <div className="title-underline" />
        </div>
        <Link href="/courses" className="text-[#575757] text-xl">
          عرض المزيد
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
        {courses.data.map((course) => {
          return <CourseCardOne course={course} key={course.id} />;
        })}
      </div>
    </div>
  );
}

export default Courses;
