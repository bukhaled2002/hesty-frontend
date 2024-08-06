import { adminAPI } from "../axios";

export type BaseAdmin = {
  name: string;
  email: string;
};

export type GetAdmin = BaseAdmin & {
  id: string;
};

export type TCreateAdmin = BaseAdmin & {
  password: string;
};

export type TUpdateAdmin = BaseAdmin;

export async function getAdmins() {
  const res = await adminAPI.get<GetAdmin[]>(`/all`);
  return res.data;
}

export async function getAdmin(id: string) {
  const res = await adminAPI.get<GetAdmin>(`/${id}`);
  return res.data;
}

export async function createAdmin(data: TCreateAdmin) {
  const res = await adminAPI.post<GetAdmin>(`/register`, data);
  return res.data;
}

export async function updateAdmin(id: string, data: TUpdateAdmin) {}

export async function deleteAdmin(id: string) {
  await adminAPI.delete(`/${id}`);
}
