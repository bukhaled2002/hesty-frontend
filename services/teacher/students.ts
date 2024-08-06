import { teacherAPI, studentAPI } from "../axios";
import { MetaData } from "../types";

export type BaseStudent = {
  firstName: string;
  lastName: string;
  email: string;
  class: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  phone: string;
  img_url?: string | null;
};

export type GetStudent = BaseStudent & {
  id: string;
};

export type TCreateStudent = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  classId: string;
  img_url?: string | null;
};

export type TUpdateStudent = Omit<TCreateStudent, "password">;

export type GetStudentsResponse = {
  count: number;
  data: GetStudent[];
  meta: MetaData;
};

export type TTransaction = {
  id: string;
  amount: number;
  reference_number: string;
  studentId: string;
  courseId: string | null;
  course?: {
    name: string;
  };
  status: "pending" | "paid" | "rejected";
  type: "course" | "wallet";
  createdAt: string;
  updatedAt: string;
};

export type GetSingleStudentResponse = {
  id: string;
  img_url: string | null;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  class: {
    id: string;
    name: string;
  };
  wallet: {
    balance: number;
  };
  courses: {
    data: {
      id: string;
      name: string;
      description: string;
      students: number;
      num_hours: string;
    }[];
    meta: MetaData;
  };
  transactions: TTransaction[];
};

export async function getStudents(
  page: string = "1",
  limit: number = 10,
  subject?: string,
  className?: string
) {
  const res = await teacherAPI.get<GetStudentsResponse>("/students", {
    params: {
      page,
      limit,
      subject,
      class: className,
    },
  });
  return res.data;
}

export async function getStudent(id: string) {
  const res = await teacherAPI.get<GetSingleStudentResponse>(`/students/${id}`);
  return res.data;
}

export async function createStudent(data: TCreateStudent) {
  const res = await studentAPI.post<GetStudent>("/register", data);
  return res.data;
}

export async function updateStudent(id: string, data: TUpdateStudent) {
  const res = await teacherAPI.patch<GetStudent>(`/students/${id}`, data);
  return res.data;
}

export async function deleteStudent(id: string) {
  await teacherAPI.delete(`/students/${id}`);
}
