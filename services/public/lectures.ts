import { hestyAPI } from "../axios";

export type BaseLecture = {
  title: string;
  is_locked: boolean;
  quizId: string | null;
  chapterId: string;
};

export type GetLecture = BaseLecture & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type GetLecturesResponse = {
  id: string;
  title: string;
  chapterId: string;
  is_locked: boolean;
  quizId: string | null;
  createdAt: string;
  updatedAt: string;
}[];

export async function getLectures(courseId: string) {
  const res = await hestyAPI.get<GetLecture[]>(`/lecture/${courseId}`);
  return res.data;
}

export async function getLecture(courseId: string, lectureId: string) {
  const res = await hestyAPI.get<GetLecture>(
    `/lecture/${courseId}/${lectureId}`
  );
  return res.data;
}

export async function getAllLecturesByChapter(chapterId: string) {
  const res = await hestyAPI.get<GetLecturesResponse>(
    `/lectures/bychapterId/${chapterId}`
  );
  return res.data;
}
