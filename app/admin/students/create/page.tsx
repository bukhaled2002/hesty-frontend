import AdminStudentsForm from "@/components/admin/students/form";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "انشاء حساب للطالب - Admin",
  description: "انشاء حساب للطالب - Admin في موقع حصتي",
};

function AdminStudentCreate({}: Props) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-7">انشاء حساب للطالب</h1>
      <AdminStudentsForm />
    </>
  );
}

export default AdminStudentCreate;
