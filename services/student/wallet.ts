import { studentAPI } from "../axios";

export type GetWalletResponse = {
  wallet: {
    id: string;
    balance: number;
    createdAt: string;
    updatedAt: string | null;
  };
  transactions: {
    id: string;
    reference_number: string;
    amount: number;
    studentId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export async function getWallet() {
  const res = await studentAPI.get<GetWalletResponse>("/wallet");
  return res.data;
}

export async function requestPayment(amount: number, reference_number: string) {
  const res = await studentAPI.post("/payment/create", {
    amount,
    reference_number,
  });
  return res.data;
}
