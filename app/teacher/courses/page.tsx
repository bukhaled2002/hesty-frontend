import TeacherCoursesContent from "@/components/teacher/courses/coursesContent";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الدورات التعليمية - Teacher",
  description: "الدورات التعليمية - Teacher في موقع حصتي",
};

type Props = {};

async function TeacherCourses({}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">الدورات التعليمية</h1>
        <Link href="/teacher/courses/create">
          <Button variant="secondary" size="sm" className="text-white">
            اضافة دورة جديدة
            <Plus className="ms-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <TeacherCoursesContent />
    </div>
  );
}

export default TeacherCourses;
