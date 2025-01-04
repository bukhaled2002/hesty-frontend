import { hestyAPI } from "../axios";
import { MetaData } from "../types";
export interface SingleChoicesEssay {
  id: string;
  answer: string;
  isCorrect: boolean;
}
export interface SingleEssayQuestion {
  id: string;
  question: string;
  explanation: string;
  courseId: string;
  chapterId: string | string[];
  lectureId: string;
  attachment: string;
  figure: string[];
  choices: SingleChoicesEssay[];
}
export interface AllEssay {
  meta: MetaData;
  questions: SingleEssayQuestion[];
}
export async function getEssay() {
  const res = await hestyAPI.get<AllEssay>("/questions-bank/essay/all", {});
  return res.data;
}

export interface CreateEssay {
  question: string;
  explanation?: string;
  attachment?: string;
  courseId?: string;
  chapterId?: string;
  lectureId?: string;
  figure?: string[];
}

export async function createEssay(data: CreateEssay[]) {
  const res = await hestyAPI.post<AllEssay>(
    "/questions-bank/essay/create",
    data
  );
  return res.data;
}

export async function getAllEssay() {
  const res = await hestyAPI.get<AllEssay>("/questions-bank/essay/all", {});
  return res.data;
}