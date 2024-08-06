import { adminAPI } from "../axios";
import { MetaData } from "../types";

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

export type PostSubject = {
  name: string;
  content: string;
  img_url?: string;
};

export type GetSubjectsResponse = {
  count: number;
  data: GetSubject[];
  meta: MetaData;
};

export async function getSubjects(
  page: string | string[] | undefined = "1",
  limit: number = 10,
  className?: string | string[] | undefined
) {
  const res = await adminAPI.get<GetSubjectsResponse>("/subjects", {
    params: {
      page,
      limit,
      className,
    },
  });
  return res.data;
}

export async function getSubject(id: string) {
  const res = await adminAPI.get<GetSubject>(`/subjects/${id}`);
  return res.data;
}

export async function createSubject(data: PostSubject) {
  const res = await adminAPI.post("/subjects/create", data);
  return res.data;
}

export async function updateSubject(id: string, data: PostSubject) {
  const res = await adminAPI.patch(`/subjects/${id}`, data);
  return res.data;
}

export async function deleteSubject(id: string) {
  const res = await adminAPI.delete(`/subjects/${id}`);
  return res.data;
}
