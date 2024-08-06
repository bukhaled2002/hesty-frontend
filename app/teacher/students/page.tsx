import StudentsTable from "@/components/teacher/students/table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الطلاب - Teacher",
  description: "الطلاب - Teacher في موقع حصتي",
};

type Props = {};

async function TeacherStudents({}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">الطلاب</h1>
      </div>
      <StudentsTable />
    </div>
  );
}

export default TeacherStudents;
