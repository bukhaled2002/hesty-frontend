import { teacherAPI } from "../axios";

export type BaseSubject = {
  img_url: string;
  name: string;
  content: string;
  classes: {
    subjectId: string;
    classId: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type GetSubject = BaseSubject & {
  id: string;
};

export type PostSubject = BaseSubject & {};

export type GetSubjectsResponse = {
  count: number;
  data: GetSubject[];
};

export async function getSubjects(page: string = "1", limit: number = 10) {
  const res = await teacherAPI.get<GetSubject[]>("/subjects", {
    params: {
      page,
      limit,
    },
  });
  return res.data;
}
