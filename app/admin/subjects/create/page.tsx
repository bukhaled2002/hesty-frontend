import AdminSubjectForm from "@/components/admin/subjects/form";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "انشاء مادة - Admin",
  description: "انشاء مادة - Admin في موقع حصتي",
};

function AdminSubjectsCreate({}: Props) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-7">انشاء مادة</h1>
      <AdminSubjectForm />
    </>
  );
}

export default AdminSubjectsCreate;
