import { adminAPI } from "../axios";
import { MetaData } from "../types";

export type BaseTransaction = {
  amount: number;
  reference_number: string;
  status: string;
  type: "course";
};

export type GetTransaction = BaseTransaction & {
  img_url:string
  id: string;
  course: {
    name: string;
  };
  student: {
    id: string;
    firstName: string;
    lastName: string;
    img_url: string;
  };
  studentId: string;
  courseId: string;
  updatedAt: string;
  createdAt: string;
};

export type PostTransaction = BaseTransaction & {};

export type GetTransactionsResponse = {
  count: number;
  data: GetTransaction[];
  meta: MetaData;
};

export async function getTransactions(page: string = "1", limit: number = 10) {
  const res = await adminAPI.get<GetTransactionsResponse>("/transactions", {
    params: {
      page,
      limit,
    },
  });
  return res.data;
}
