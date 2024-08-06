import { parentAPI } from "../axios";

export type PostData = {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
};

export async function registerParent(data: PostData) {
  const response = await parentAPI.post("/register", data);
  return response.data;
}
