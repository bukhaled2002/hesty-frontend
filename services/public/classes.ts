import { hestyAPI } from "../axios";

export type BaseClass = {
  name: string;
};

export type GetClass = BaseClass & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export async function getClasses() {
  const res = await hestyAPI.get<GetClass[]>("/class/all");
  return res.data;
}

export async function getClass(id: string) {
  const res = await hestyAPI.get<GetClass>(`/class/${id}`);
  return res.data;
}
