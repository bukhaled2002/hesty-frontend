import { Button } from "@/components/ui/button";
import { GetCourse } from "@/services/public/courses";
import Image from "next/image";
import Link from "next/link";
import { transformGoogleDriveUrl } from "@/lib/helper/ExtractImg";

type Props = {
  course: GetCourse;
};

function CourseCardOne({ course }: Props) {
    const courseImg = transformGoogleDriveUrl(course.img_url?.trim() !== null || ""
    ? course.img_url?.trim()
    : "/images/placeholder.png"
)
  const teacherImg = transformGoogleDriveUrl(course.teacher.img_url?.trim())
  console.log('course',course)
  return (
    <div className="block rounded-lg border border-[#00000026]">
      <div className="h-48">
        <Link href={`/courses/${course.id}`}>
          <Image
            src={courseImg}
            width={500}
            height={500}
            className="size-full max-h-[201px] rounded-md object-cover"
            alt="Course Image"
          />
        </Link>
      </div>
      <Link
        href={`/teachers/${course.teacherId}`}
        className="flex flex-col w-fit m-auto items-center -mt-10"
      >
        <Image
          src={teacherImg}
          width={100}
          height={100}
          className="rounded-full w-[56px] h-[56px] size-full object-cover"
          alt={course.teacher.fullName + "Image"}
        />
        <div className="text-xl font-semibold w-32 line-clamp-1 text-center">
          {course.teacher.fullName}
        </div>
      </Link>

      <div className="p-4 flex flex-col justify-between items-start">
        <div className="space-y-[8px]">
          <h1 className="font-bold text-xl">{course.name}</h1>
          <h2 className="text-base font-medium">{course.class.name}</h2>
          <h3 className="text-base font-semibold text-primary">
            {course.price_after_discount} ج.م
          </h3>
        </div>
        <div className="mt-6 flex items-center justify-center w-full">
          <Link href={`/courses/${course.id}`} className="w-full">
            <Button className="text-lg font-semibold rounded-[10px] w-full">
              عرض الدورة
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCardOne;
