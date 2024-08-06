import { teacherAPI } from "../axios";

export type GetSingleTeacherResponse = {
  id: string;
  email: string;
  fullName: string;
  img_url?: string;
  info: string;
  phone: string;
  city: string;
  password: string;
  isPin: boolean;
  subjectId: string;
  createdAt: string;
  updatedAt: string;
  subject: {
    id: string;
    name: string;
    content: string;
    img_url: string;
  };
  students: {
    data: any[];
    meta_data: any;
  };
  courses: {
    data: any[];
    meta_data: any;
  };
};

export type TUpdateTeacher = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  info: string;
  img_url?: string;
};

export async function getTeacherProfile() {
  const res = await teacherAPI.get<GetSingleTeacherResponse>(`/profile`);
  return res.data;
}

export async function updateTeacher(teacherId: string, data: TUpdateTeacher) {
  const res = await teacherAPI.patch<GetSingleTeacherResponse>(
    `${teacherId}`,
    data
  );
  return res.data;
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  const res = await teacherAPI.patch<GetSingleTeacherResponse>(
    `/change/password`,
    data
  );
  return res.data;
}
