import { getCourses } from "@/services/public/courses";
import Link from "next/link";
import CoursesCarousel from "./CoursesCarousel";

type Props = {};

async function Courses({}: Props) {
  const courses = await getCourses();
  console.log('courses',courses)
  return (
    <div className="container py-10 space-y-14">
      <div className="header flex items-center justify-between">
        <div className="title relative w-fit">
          <h1 className="sm:text-[26px] text-[22px] font-bold">الدورات المتاحة</h1>
          <div className="title-underline" />
        </div>
        <Link href="/courses" className="text-[#575757] sm:text-xl">
          عرض المزيد
        </Link>
      </div>
      <CoursesCarousel courses={courses} />
    </div>
  );
}

export default Courses;
