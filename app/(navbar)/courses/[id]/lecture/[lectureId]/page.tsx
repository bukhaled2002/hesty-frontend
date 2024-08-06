import LectureContent from "@/components/courses/lectureContent";
import { getLecture } from "@/services/student/lectures";
import { QueryClient } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getCourse } from "@/services/public/courses";
import { getCourseProgress } from "@/services/student/courses";
import { ChevronLeft, HelpCircle, Trophy, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الدرس",
  description: "صفحة الدرس في موقع حصتي",
};

type Props = {
  params: { id: string; lectureId: string };
};

async function SingleLecture({ params }: Props) {
  const { id: courseId, lectureId } = params;
  const course = await getCourse(courseId);
  const courseProgress = await getCourseProgress(courseId);

  return (
    <div className="container py-10 relative">
      <div className="teacher flex items-center gap-x-2 text-secondary font-bold text-xs mb-1">
        <div>{course.teacher.fullName}</div>
        <Separator orientation="vertical" className="h-6 w-0.5 rounded" />
        <div>{course.subject.name}</div>
      </div>
      <div className="relative pt-10">
        <section className="grid grid-cols-11 gap-x-10 min-h-full mb-16 pt-5">
          <div className="col-span-8 space-y-6 h-full">
            <LectureContent courseId={courseId} lectureId={lectureId} />
          </div>
          <div className="col-span-3 space-y-6 h-full">
            <div className="flex items-center justify-between">
              <div>
                مكتمل {courseProgress.videosWatched} /{" "}
                {courseProgress.totalVideos}
              </div>
              <Trophy size={20} className="text-primary" />
            </div>
            <Accordion
              type="multiple"
              className="border rounded-[12px] h-[500px] p-4 overflow-y-auto"
            >
              {course.chapters.map((chapter, index) => {
                return (
                  <AccordionItem
                    key={index}
                    value={chapter.name}
                    className="border-0"
                  >
                    <AccordionTrigger className="py-3.5 font-medium text-base [&[data-state=open]>svg]:-rotate-90">
                      <div
                        className={cn(
                          "flex items-center gap-x-3 text-lg font-semibold"
                        )}
                      >
                        <div className="border-2 border-secondary w-6 h-6 text-sm rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        {chapter.name}
                      </div>
                      <ChevronLeft className="w-6 h-6 shrink-0 transition-transform duration-200 text-[#12121299]" />
                    </AccordionTrigger>
                    <AccordionContent className="space-y-1">
                      {chapter.lectures.map((lecture) => {
                        return (
                          <>
                            <Link
                              href={`/courses/${courseId}/lecture/${lecture.id}`}
                              key={lecture.id}
                              className={cn(
                                "flex items-center gap-x-1.5 py-3 px-4 rounded-[12px] text-base font-semibold transition-colors duration-200 hover:text-secondary/90",
                                lectureId === lecture.id &&
                                  "text-secondary bg-secondary/10"
                              )}
                            >
                              <VideoIcon size={22} />{" "}
                              <div className="title">{lecture.title}</div>
                            </Link>
                            {lecture.quizizz.map((quiz) => {
                              return (
                                <Link
                                  href={`/courses/${courseId}/lecture/${lecture.id}/quiz/${quiz.id}`}
                                  key={quiz.id}
                                  className={cn(
                                    "flex items-center gap-x-1.5 py-3 px-4 text-base font-semibold transition-colors duration-200 hover:text-secondary/90"
                                  )}
                                >
                                  <HelpCircle size={22} />{" "}
                                  <div className="title">{quiz.title}</div>
                                </Link>
                              );
                            })}
                          </>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </section>
      </div>
      <section className="space-y-7 border-b-2 pb-20 mb-[60px]">
        <div className="flex items-center gap-x-5">
          <div className="text-primary bg-primary/10 rounded-full text-base px-4 py-2.5 w-full max-w-[180px] text-center">
            {course.class.name}
          </div>
          <div className="text-secondary bg-secondary/10 rounded-full text-base px-4 py-2.5 w-full max-w-[180px] text-center">
            {course.subject.name}
          </div>
        </div>
        <h1 className="text-3xl font-bold mt-5">مقدمة عن {course.name}</h1>
        <p className="text-xl text-[#121212B2]/70 font-semibold leading-[33px]">
          {course.description}
        </p>
      </section>
      <section className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-x-6">
          <Image
            src={course.teacher.img_url.trim()}
            width={500}
            height={500}
            className="w-[103px] h-[103px] size-full rounded-full object-contain"
            alt="teacher"
          />
          <div className="flex flex-col gap-y-1.5">
            <h1 className="text-2xl font-bold">
              مستر {course.teacher.fullName}
            </h1>
            <h3 className="text-[#6F6F6F] font-medium text-[20px]">
              معلم {course.class.name}
            </h3>
          </div>
        </div>
        <Button className="text-lg font-semibold bg-[#F5F5F5] hover:bg-[#6F6F6F] text-[#6F6F6F] hover:text-white py-[10px] px-6">
          الملف الشخصي
        </Button>
      </section>
    </div>
  );
}

export default SingleLecture;
