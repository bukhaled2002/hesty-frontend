import { adminAPI } from "../axios";
import { MetaData } from "../types";

export type BaseCharageRequest = {
  amount: number;
  reference_number: string;
  status: "pending" | "paid" | "rejected";
};

export type GetCharageRequest = BaseCharageRequest & {
  id: string;
  createdAt: string;
  student: {
    id: string;
    img_url: string | null;
    firstName: string;
    lastName: string;
  };
};

export type PostCharageRequest = BaseCharageRequest & {};

export type GetChargeRequestsResponse = {
  count: number;
  data: GetCharageRequest[];
  meta: MetaData;
};

export async function getChargeRequests(
  page: string = "1",
  limit: number = 10
) {
  const res = await adminAPI.get<GetChargeRequestsResponse>(
    "/payment-requests",
    {
      params: {
        page,
        limit,
      },
    }
  );
  return res.data;
}

export async function changeChargeRequestStatus(
  id: string,
  status: "paid" | "rejected"
): Promise<void> {
  await adminAPI.patch(`/payment-requests/${id}`, { status });
}
