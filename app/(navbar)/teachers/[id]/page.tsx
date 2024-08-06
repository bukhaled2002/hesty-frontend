import CourseCardTwo from "@/components/cards/courseCard-2";
import Pagination from "@/components/pagination";
import { getTeacher } from "@/services/teacher";
import Image from "next/image";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id;
  const teacher = await getTeacher(id);
  return {
    title: `${teacher.fullName} | معلم ${teacher.subject.name}`,
    description: `${teacher.info}`,
  };
}

type Props = {
  params: {
    id: string;
  };
};

async function Teacher({ params }: Props) {
  const { id } = params;
  const teacher = await getTeacher(id);
  const currentPage = String(teacher.courses.meta_data.currentPage);
  const totalPages = teacher.courses.meta_data.totalPages;
  const nextPage = teacher.courses.meta_data.nextPage;
  const previousPage = teacher.courses.meta_data.previousPage;
  console.log(teacher);

  return (
    <>
      <section className="overflow-hidden bg-[#5949be] relative z-10 py-16 text-white">
        <div className="container space-y-10">
          <div className="flex items-center gap-x-5">
            <Image
              src={teacher.img_url.trim() ?? "/images/teacher.webp"}
              width={200}
              height={200}
              className="w-[125px] h-[125px] rounded-full object-cover size-full"
              alt="teacher"
            />
            <div>
              <h1 className="text-2xl mb-3">{teacher.fullName}</h1>
              <h3 className="text-white/70">معلم {teacher.subject.name}</h3>
            </div>
          </div>
          <div>
            <h1 className="text-xl mb-3">عن المعلم</h1>
            <p className="text-white/80 text-base">{teacher.info}</p>
          </div>
          <div className="flex items-center gap-x-6 ">
            <div>
              <div className="text-sm font-medium mb-2">الطلاب</div>
              <div className="text-base font-bold">
                {teacher._count.students}+
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-2">الكورسات</div>
              <div className="text-base font-bold">
                {teacher._count.courses}+
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container py-10">
        <div className="title relative w-fit mb-10">
          <h1 className="text-2xl font-bold">الدورات المتاحة</h1>
          <div className="title-underline" />
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
          {teacher.courses.data.map((course) => (
            <CourseCardTwo showBtn={true} course={course} key={course.id} />
          ))}
        </div>
        {totalPages !== 0 && (
          <div className="flex items-center justify-center">
            <Pagination
              currentPage={currentPage}
              last_page={totalPages}
              nextPage={nextPage}
              previousPage={previousPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Teacher;
