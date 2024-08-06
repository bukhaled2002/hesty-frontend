import { hestyAPI } from "./axios";
import { MetaData } from "./types";

export type BaseSubject = {
  name: string;
  content: string;
  class: string;
  img_url: string;
};

export type GetSubject = BaseSubject & {
  id: string;
  teacherId: string;
};

export type GetSubjectsResponse = {
  count: number;
  data: GetSubject[];
  meta: MetaData;
};

export async function getSubjects() {
  const res = await hestyAPI.get<GetSubjectsResponse>("/subject/all");
  return res.data;
}

export async function getSubject(id: string) {
  const res = await hestyAPI.get<GetSubject>(`/subject/${id}`);
  return res.data;
}
