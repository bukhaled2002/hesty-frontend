import { hestyAPI } from "./axios";

export type PostQuiz = {
  title: string;
  duration: string;
  lectureId: string;
  questions: {
    question: string;
    figure?: string[];
    choices: {
      answer: string;
      isCorrect: boolean;
    }[];
  }[];
};

export async function createQuiz(data: PostQuiz) {
  const res = await hestyAPI.post(`/quiz/create`, data);
  return res.data;
}
