"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AdminCreateQuizeForm from "./createQuizForm";
import AdminCreateEssayForm from "./AdminCreateEssayForm";
import AdminCreateExamForm from "./AdminCreateExamForm";
interface ChooseQuizType {
  lectureId: string;
  courseId: string;
}
const ChooseQuiz: React.FC<ChooseQuizType> = ({ lectureId, courseId }) => {
  const [quizType, setQuizType] = useState("not-selected");
  return (
    <>
      {quizType === "not-selected" && (
        <div className="bg-white rounded-[8px] p-[16px] flex items-center justify-center gap-[16px]">
          <Button onClick={() => setQuizType("mcq")}>MCQ</Button>
          <Button onClick={() => setQuizType("essay")}>Essay</Button>
          <Button onClick={() => setQuizType("mix")}>Mix</Button>
        </div>
      )}
      {quizType === "mcq" && (
        <AdminCreateQuizeForm courseId={courseId} lectureId={lectureId} />
      )}
      {quizType === "essay" && (
        <AdminCreateEssayForm courseId={courseId} lectureId={lectureId} />
      )}
      {quizType === "mix" && (
        <AdminCreateExamForm courseId={courseId} lectureId={lectureId} />
      )}
    </>
  );
};
export default ChooseQuiz;
