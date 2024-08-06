import { Metadata } from "next";
import { hestyAPI, studentAPI } from "../axios";
import { GetMyCourse } from "../teacher";

export type GetCoursesResponse = {
  data: GetMyCourse[];
  meta_data: Metadata;
};

export type CompleteVideoResponse = {
  id: string;
  studentId: string;
  videoId: string;
  courseId: string;
  IsWatched: boolean;
  createdAt: string;
  updatedAt: string;
};

export async function getCourses() {
  const response = await studentAPI.get<GetCoursesResponse>(
    "/courses-assigned"
  );
  return response.data;
}

export async function getCourseProgress(courseId: string) {
  const response = await hestyAPI.get<{
    videosWatched: number;
    totalVideos: number;
    percentage: number;
  }>(`/video/progress/${courseId}`);
  return response.data;
}

export async function completeVideo(videoId: string) {
  await hestyAPI.post<CompleteVideoResponse>(`/video/progress/${videoId}`);
}
