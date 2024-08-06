import { adminAPI } from "../axios";

export type GetStats = {
  students: number;
  teachers: number;
  courses: number;
  classes: number;
  totalPayment: number;
  classData: { name: string; students: number }[];
};

export async function getStats() {
  const response = await adminAPI.get<GetStats>("/statistics");
  return response.data;
}
