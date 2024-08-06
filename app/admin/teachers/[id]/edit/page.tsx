import AdminTeachersForm from "@/components/admin/teachers/form";
import { getTeacher } from "@/services/teacher";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: "تعديل حساب المعلم - Admin",
  description: "تعديل حساب المعلم - Admin في موقع حصتي",
};

async function AdminTeacherEdit({ params }: Props) {
  const id = params.id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["teacher-admin", id],
    queryFn: () => (id ? getTeacher(id) : null),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className="text-3xl font-bold mb-7">تعديل حساب المعلم</h1>
      <AdminTeachersForm id={id} />
    </HydrationBoundary>
  );
}

export default AdminTeacherEdit;
