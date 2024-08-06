import { teacherAPI } from "../axios";

export type GetStats = {
  students: number;
  courses: number;
  totalPayment: number;
  studentsCountInCourses: { course: string; students: number }[];
};

export async function getStats() {
  const response = await teacherAPI.get<GetStats>("/statistics");
  return response.data;
}
