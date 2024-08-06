import { studentAPI } from "../axios";

export type BaseLecture = {
  title: string;
  is_locked: boolean;
  quizId: string | null;
  chapterId: string;
  video: {
    id: string;
    url: string;
    count_watched: number;
    duration: number;
    createdAt: string;
    updatedAt: string;
  };
};

// {
//   lecture: {
//     id: '3a44f89f-2afb-4aac-947d-3d273fdc0019',
//     title: 'test',
//     chapterId: '13571d72-85e7-4e4c-b26e-7363edaa3641',
//     is_locked: true,
//     createdAt: '2024-07-14T19:52:35.065Z',
//     updatedAt: '2024-07-14T20:37:58.097Z',
//     video: {
//       id: '1316b125-5b7e-46fa-9e0b-71fc24ebf941',
//       url: 'https://www.youtube.com/watch?v=xl2xKFG1fYk',
//       duration: null,
//       count_watched: 16,
//       lectureId: '3a44f89f-2afb-4aac-947d-3d273fdc0019',
//       createdAt: '2024-07-14T19:52:35.065Z',
//       updatedAt: '2024-07-14T20:37:58.097Z'
//     }
//   },
//   count_watched_left: 14
// }
export type GetLecture = {
  lecture: BaseLecture & {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  count_watched_left: number;
};

export async function getLecture(courseId: string, lectureId: string) {
  const res = await studentAPI.get<GetLecture>(`/${courseId}/${lectureId}`);
  return res.data;
}
