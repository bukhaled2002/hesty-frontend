import AdminIntialBookForm from "@/components/admin/books/InIntialBookForm";

type Props = {};

function AdminCourseCreate({}: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold">اضافة كتاب جديدة</h1>
      <h2 className="text-[#121212B2]/70 text-lg font-semibold mb-4">
        من فضلك قم بمليء جميع تفاصيل الكتاب
      </h2>
      <AdminIntialBookForm />
    </div>
  );
}

export default AdminCourseCreate;
