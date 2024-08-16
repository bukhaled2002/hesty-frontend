import CourseCardTwo from "@/components/cards/courseCard-2";
import { Button } from "@/components/ui/button";
import { getCourses } from "@/services/student/courses";
import { getProfile } from "@/services/student/profile";
import Image from "next/image";
import Link from "next/link";
import { transformGoogleDriveUrl } from "@/lib/helper/ExtractImg";
import StudentProfileCourses from "@/components/student/StudentProfileCourses";
type Props = {};

async function Profile({ }: Props) {
  const studentData = await getProfile();
  const studentCourses = await getCourses();
  const studentAvatar = transformGoogleDriveUrl(studentData.img_url.trim() || "/images/teacher.png")
  return (
    <div className="container py-8 font-bold text-base">
      <section className="border rounded-lg flex flex-col items-center justify-center space-y-5 py-12 sm:mb-16 mb-8">
        <div className="flex items-center gap-x-4">
          <Image
            src={studentAvatar}
            width={500}
            height={500}
            className="w-24 h-24 rounded-full object-cover object-[75%_25%]"
            alt={studentData.firstName + " " + studentData.lastName + " image"}
          />
          <div>
            <h1 className="text-2xl capitalize">
              {studentData.firstName + " " + studentData.lastName}
            </h1>
            {/* <h2>{studentData.city}</h2> */}
          </div>
        </div>
        <div className="font-semibold sm:text-xl text-lg">
          الرصيد المتاح في حسابك الأن هو{" "}
          <span className="text-primary font-bold">
            {studentData.wallet.balance} ج.م
          </span>
        </div>
        <div className="flex items-center sm:flex-row flex-col gap-x-[18px] w-full gap-y-3 px-6">
          <Link className=" w-full" href="/wallet">
            <Button className="text-base font-semibold rounded-[10px] py-[9px] px-10 w-full">
              شحن المحفظة
            </Button>
          </Link>
          <Link className=" w-full" href="/profile/change-password">
            <Button
              className="text-base font-semibold rounded-[10px] py-[9px] px-10 w-full"
              variant="outline"
              size={"lg"}
            >
              تغيير كلمة السر
            </Button>
          </Link>
        </div>
      </section>
      <section className="py-10">
        <div className="title relative w-fit mb-10">
          <h1 className="text-2xl font-bold">الدورات المشترك بها</h1>
          <div className="title-underline" />
        </div>
        {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8"> */}
        <StudentProfileCourses courses={studentCourses}/>
        {/* </div> */}
        {/* <div className="flex items-center justify-center">
          <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          last_page={10}
          prev_page_url={null}
          next_page_url={null}
        />
        </div> */}
      </section>
    </div>
  );
}

export default Profile;
