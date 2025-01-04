import { hestyAPI } from "./axios";

type Quiz = {
  title: string;
  questions: {
    question: string;
    figure: string[];
    choices?: {
      answer: string;
      isCorrect: boolean;
    }[] | undefined;
  }[];
};
type QuizEssay = {
  title: string;
  QuestionEssay: {
    question: string;
    explanation: string;
    attachment: string;
    figure: string[];
  }[];
};
export type PostExam = {
  title: string;
  duration: string;
  lectureId?: string | string[];
  chapterId?: string;
  Quiz?: Quiz | undefined;
  QuizEssay?: QuizEssay | undefined;
};

export async function createExam(data: PostExam) {
  const res = await hestyAPI.post(`/exam`, data);
  return res.data;
}

export async function getAllEssays() {
  try {
    const res = await hestyAPI.get(`/essay/all`);
    return res.data as Quiz[];
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
}

export async function GetEssay(courseId: string): Promise<Quiz[]> {
  try {
    const res = await hestyAPI.get(`/essay/${courseId}`);
    return res.data as Quiz[];
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
}

export async function deleteEssay(quizId: string) {
  try {
    const res = await hestyAPI.delete(`/essay/${quizId}`);
    console.log("Quiz deleted successfully:", res);
    return res.data;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
}
