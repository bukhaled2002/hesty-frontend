import AdminSubjectForm from "@/components/admin/subjects/form";
import AdminTeachersForm from "@/components/admin/teachers/form";
import { getSubject } from "@/services/admin/subjects";
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
  title: "تعديل المادة - Admin",
  description: "تعديل المادة - Admin في موقع حصتي",
};

async function AdminSubjectsEdit({ params }: Props) {
  const id = params.id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["subjects-admin", id],
    queryFn: () => (id ? getSubject(id) : null),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className="text-3xl font-bold mb-7">تعديل المادة</h1>
      <AdminSubjectForm id={id} />
    </HydrationBoundary>
  );
}

export default AdminSubjectsEdit;
