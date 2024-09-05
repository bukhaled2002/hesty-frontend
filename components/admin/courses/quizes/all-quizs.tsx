"use client";
import { Quiz } from "@/services/quiz";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteQuiz } from "@/services/quiz";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
type AllQuizsProps = {
    data: { quiz: Quiz[] }; // Use the Quiz type here
    courseId: string;
  };
  
  
const AllQuizs = ({ data, courseId }: AllQuizsProps) => { // Pass courseId to fetch specific course quizzes
  const queryClient = useQueryClient();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null); // Track the selected quiz to delete
  const router = useRouter();

  const { mutate: DeleteQuiz, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteQuiz(id),
    onSuccess: () => {
      toast({
        title: "تم حذف الامتحان بنجاح",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-quizs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-quizs", courseId] });
      setDeleteOpen(false);
      setSelectedQuizId(null);
      router.push("/admin/courses");

    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast({
          title: error.response?.data.message || "حدث خطأ ما",
          variant: "destructive",
        });
      } else {
        toast({
          title: "حدث خطأ ما",
          variant: "destructive",
        });
      }
    },
  });

  const handleDeleteClick = (quizId: string) => {
    setSelectedQuizId(quizId); // Set the quiz to be deleted
    setDeleteOpen(true); // Open the delete confirmation dialog
  };

  const confirmDelete = () => {
    if (selectedQuizId) {
      DeleteQuiz(selectedQuizId); // Perform the delete mutation
    }
  };

  return (
    <div>
      <div className="bg-white p-5 rounded-[12px] space-y-5">
        {data.quiz?.length > 0 ? (
          <>
            {data.quiz.map((quiz, index) => (
              <div
                className="flex justify-between border border-black/15 rounded-lg px-4 py-6"
                key={index}
              >
                <h1 className="text-xl font-bold">{quiz.title}</h1>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleDeleteClick(quiz.id); // Open the delete dialog for the selected quiz
                  }}
                >
                  <TrashIcon className="text-red-500 size-4" />
                </button>
              </div>
            ))}
          </>
        ) : (
          <h1 className="text-xl font-bold text-center">لا يوجد امتحانات لهذه الدورة</h1>
        )}

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-start">
                هل انت متأكد من حذف الامتحان؟
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-500 text-start">
                لا يمكنك التراجع بعد الحذف.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-x-2">
              <AlertDialogCancel
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteOpen(false); // Close the dialog
                }}
              >
                رجوع
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDelete(); // Confirm delete action
                }}
              >
                {isDeleting ? "جاري الحذف..." : "حذف"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AllQuizs;
