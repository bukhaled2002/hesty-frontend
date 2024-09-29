import { adminAPI, hestyAPI } from "../axios";
import { MetaData } from "../types";

export type BaseCourse = {
  img_url?: string;
  title: string;
  code: string;
  students_count: number;
};

export type createLectureType = {
  title: string;
  video: {
    url: string;
    duration: string;
    count_watched: number;
  };
};
export type GetCourse = BaseCourse & {
  id: string;
  IsActive: boolean;
};

export type PostCourse = Omit<BaseCourse, "students_count"> & {
  teacherId: string;
  price: string;
  discountPercentage?: number;
  subjectId: string;
  classId: string | null;
  IsActive: boolean;
};

export type GetSingleCourseResponse = {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  img_url: string;
  price: string;
  discountPercentage: number;
  subjectId: string;
  classId: string | null;
  IsActive: boolean;
};

export type GetCoursesResponse = {
  count: number;
  lectures: GetCourse[];
  metaData: MetaData;
};

export type PostLecture = {
  name: string;
  description: string;
  lectures: {
    title: string;
    video: {
      url: string;
      count_watched: string;
    };
  }[];
}[];

export type TeditLecture = PostLecture & {
  id: string;
  lectures: {
    id: string;
  };
};

export type GetChaptersResponse = {
  id: string;
  name: string;
  description: string;
  courseId: string;
  lectures: {
    id: string;
    title: string;
    video: {
      id: string;
      url: string;
      count_watched: number;
    } | null;
  }[];
}[];

export type GetLecturesResponse = {
  id: string;
  title: string;
  chapterId: string;
  is_locked: boolean;
  quizId: string | null;
  createdAt: string;
  updatedAt: string;
}[];

export async function getLectures(page: string = "1", limit: number = 10) {
  const res = await hestyAPI.get<GetCoursesResponse>("/lecture/all", {
    params: {
      page,
      limit,
    },
  });
  return res.data;
}

export async function createLecture(course: createLectureType) {
  const res = await hestyAPI.post<createLectureType>("/lecture/create", course);
  return res.data;
}

export async function updateCourse(id: string, course: Partial<PostCourse>) {
  const res = await adminAPI.patch<GetCourse>(`/courses/${id}`, course);
  return res.data;
}

export async function deleteLecture(id: string) {
  await hestyAPI.delete(`/lecture/${id}`);
}

export async function addCourseContent(courseId: string, data: PostLecture) {
  await adminAPI.post(`/chapters/create/${courseId}`, data);
}

export async function updateCourseContent(
  courseId: string,
  data: TeditLecture[]
) {
  await adminAPI.patch(`/chapters/${courseId}`, data);
}

export async function getAllChapters(courseId: string) {
  const res = await adminAPI.get<GetChaptersResponse>(`/chapters/${courseId}`);
  return res.data;
}

export async function deleteChapter(chapterId: string) {
  await adminAPI.delete(`/chapters/delete/${chapterId}`);
}

export async function getAllLecturesByChapter(chapterId: string) {
  const res = await hestyAPI.get<GetLecturesResponse>(
    `/lectures/bychapterId/${chapterId}`
  );
  return res.data;
}
