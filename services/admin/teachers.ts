import { adminAPI } from "../axios";
import { MetaData } from "../types";

export type BaseTeacher = {
  img_url?: string;
  fullName: string;
  email: string;
  subject: {
    id: string;
    name: string;
    content: string;
    img_url: string;
  };
  phone: string;
  isPin?: boolean;
};

export type GetTeacher = BaseTeacher & {
  id: string;
};

export type TCreateTeacher = Omit<BaseTeacher, "subject"> & {
  subjectId: string;
  password: string;
};

export type TUpdateTeacher = Omit<BaseTeacher, "subject"> & {
  subjectId: string;
};

export type GetTeachersResponse = {
  count: number;
  data: GetTeacher[];
  meta: MetaData;
};

export type GetSingleTeacherResponse = Omit<GetTeacher, "subject"> & {
  _count: {
    students: number;
    courses: number;
  };
  info: string;
  city: string;
  courses: {
    data: any[];
    meta_data: MetaData;
  };
  subject: {
    id: string;
    name: string;
    classes: {
      class: {
        name: string;
      };
    }[];
  };
};

export async function getTeachers(
  page: string | string[] | undefined = "1",
  limit: number = 10,
  subject?: string | string[] | undefined,
  className?: string | string[] | undefined
) {
  const res = await adminAPI.get<GetTeachersResponse>("/teachers", {
    params: {
      page,
      limit,
      subject,
      className,
    },
  });
  return res.data;
}

export async function getTeacher(
  id: string,
  page: number = 1,
  limit: number = 6
) {
  const res = await adminAPI.get<GetSingleTeacherResponse>(`/teachers/${id}`, {
    params: {
      page,
      limit,
    },
  });
  return res.data;
}

export async function createTeacher(data: TCreateTeacher) {
  const res = await adminAPI.post<GetTeacher>("/teachers/create", data);
  return res.data;
}

export async function updateTeacher(id: string, data: Partial<TUpdateTeacher>) {
  const res = await adminAPI.patch<GetTeacher>(`/teachers/${id}`, data);
  return res.data;
}

export async function deleteTeacher(id: string) {
  await adminAPI.delete(`/teachers/${id}`);
}
