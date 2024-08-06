import { hestyAPI } from "./axios";

export type User = {
  id: string;
  name: string;
  email: string;
  img_url: string;
  role: string;
  iat: number;
  exp: number;
};

export async function getUserByToken() {
  const res = await hestyAPI.get<User>("/auth/user");
  return res.data;
}
