import AdminIntialCourseForm from "@/components/admin/courses/InIntialCourseForm";

type Props = {};

function AdminCourseCreate({}: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold">اضافة دورة جديدة</h1>
      <h2 className="text-[#121212B2]/70 text-lg font-semibold mb-4">
        من فضلك قم بمليء جميع تفاصيل المادة
      </h2>
      <AdminIntialCourseForm />
    </div>
  );
}

export default AdminCourseCreate;
