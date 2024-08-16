import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GetMyCourse } from "@/services/teacher";
import { Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { transformGoogleDriveUrl } from "@/lib/helper/ExtractImg";
type Props = {
  course: GetMyCourse;
  showBtn?: boolean;
  className?: string;
};

function CourseCardTwo({ course, showBtn, className }: Props) {
  const courseImg = transformGoogleDriveUrl(course.img_url?.trim() ?? "/images/card-bg-2.webp")
  console.log('course',course)
  return (
    <div
      className={cn("block rounded-lg border border-[#00000026]", className)}
    >
      <Link href={`/courses/${course.id}`}>
        <div className="h-60 relative">
          <Image
            alt={course.name + " course"}
            src={courseImg}
            width={500}
            height={500}
            className="h-full w-full rounded-md object-cover"
          />
          <div className="absolute bottom-0 flex border-b-[6px] border-primary items-center justify-between text-white bg-black bg-opacity-30 w-full px-4 py-2 text-sm">
            <div>
              {course._count.students} طالب
              <Users size={16} className="inline ms-1" />
            </div>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <div>
          <h1 className="font-bold text-lg mb-1">{course.name}</h1>
          <h2 className="text-base font-semibold">{course.description}</h2>
          <h3 className="text-base font-semibold text-primary">
            {course.price_after_discount} ج.م
          </h3>
        </div>
        {showBtn && (
          <div className="mt-6 flex items-center justify-center">
            <Link href={`/courses/${course.id}`} className="w-full">
              <Button className="text-base font-semibold rounded-[10px] w-full">
                عرض الدورة
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCardTwo;
