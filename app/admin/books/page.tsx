import AdminBooksContent from "@/components/admin/books/booksContent";
import AdminCoursesContent from "@/components/admin/courses/coursesContent";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الكتب الدراسية - Admin",
  description: "الكتب الدراسية - Admin في موقع حصتي",
};

type Props = {};

async function AdminCourses({}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">الكتب الدراسية</h1>
        <Link href="/admin/books/create">
          <Button variant="secondary" size="sm" className="text-white">
            اضافة كتاب جديد
            <Plus className="ms-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <AdminBooksContent />
    </div>
  );
}

export default AdminCourses;
