import { teacherAPI } from "../axios";
import { MetaData } from "../types";

export type GetMyCourse = {
  id: string;
  name: string;
  description: string;
  img_url: string;
  num_hours: string;
  price: string;
  price_after_discount: string;
  _count: {
    students: number;
    chapters: number;
  };
  students: [];
};

export type BaseTeacher = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  class: string;
  info: string;
  img_url: string;
  subject: {
    id: string;
    name: string;
    content: string;
    class: string;
    img_url: string;
    teacherId: string;
  };
  students: [];
  courses: {
    data: GetMyCourse[];
    meta_data: MetaData;
  };
};

export type GetTeacher = BaseTeacher & {
  id: string;
  _count: {
    students: number;
    courses: number;
  };
};

export async function getTeacher(
  id: string,
  coursePage: number = 1,
  courseLimit: number = 6
) {
  const res = await teacherAPI.get<GetTeacher>(`/${id}`, {
    params: {
      page: coursePage,
      limit: courseLimit,
    },
  });
  return res.data;
}

export async function getTeachers() {
  const res = await teacherAPI.get<GetTeacher[]>("/all");
  return res.data;
}
