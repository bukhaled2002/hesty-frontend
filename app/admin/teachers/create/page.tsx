import AdminTeachersForm from "@/components/admin/teachers/form";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "انشاء حساب لمعلم - Admin",
  description: "انشاء حساب لمعلم - Admin في موقع حصتي",
};

function AdminTeacherCreate({}: Props) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-7">انشاء حساب لمعلم</h1>
      <AdminTeachersForm />
    </>
  );
}

export default AdminTeacherCreate;
