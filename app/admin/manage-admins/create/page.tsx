import AdminForm from "@/components/admin/manage-admins/form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "انشاء مشرف - Admin",
  description: "انشاء مشرف - Admin في موقع حصتي",
};

type Props = {};

function AdminCreate({}: Props) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-7">انشاء مشرف</h1>
      <AdminForm />
    </>
  );
}

export default AdminCreate;
