import AdminIntialLectureForm from "@/components/admin/temp-lectures/InIntialLectureForm";
type Props = {};

function AdminLectureCreate({}: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold">اضافة حصة جديدة</h1>
      <h2 className="text-[#121212B2]/70 text-lg font-semibold mb-4">
        من فضلك قم بمليء جميع تفاصيل الحصة
      </h2>
      <AdminIntialLectureForm />
    </div>
  );
}

export default AdminLectureCreate;
