import { studentAPI } from "../axios";

export type GetProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  img_url: string;
  parentId: string | null;
  walletId: string;
  createdAt: string;
  parent: null;
  wallet: {
    id: string;
    balance: number;
  };
  class: null;
};

export async function getProfile() {
  const response = await studentAPI.get<GetProfile>("/profile");
  return response.data;
}
