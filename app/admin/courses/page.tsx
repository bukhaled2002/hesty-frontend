import AdminCoursesContent from "@/components/admin/courses/coursesContent";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الدورات التعليمية - Admin",
  description: "الدورات التعليمية - Admin في موقع حصتي",
};

type Props = {};

async function AdminCourses({}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">الدورات التعليمية</h1>
        <Link href="/admin/courses/create">
          <Button variant="secondary" size="sm" className="text-white">
            اضافة دورة جديدة
            <Plus className="ms-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <AdminCoursesContent />
    </div>
  );
}

export default AdminCourses;
