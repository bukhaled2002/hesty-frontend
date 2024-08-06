import { parentAPI } from "../axios";
import { MetaData } from "../types";

export type BaseSon = {
  firstName: string;
  lastName: string;
  email: string;
  class: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  phone: string;
  img_url?: string | null;
  wallet: {
    balance: number;
  };
};

export type GetSon = BaseSon & {
  id: string;
};

export type PostSon = {
  studentPhone: string;
};

export type GetSonsResponse = {
  count: number;
  data: GetSon[];
  meta: MetaData;
};

export type TTransaction = {
  id: string;
  amount: number;
  reference_number: string;
  studentId: string;
  courseId: string | null;
  course?: {
    name: string;
  };
  status: "pending" | "paid" | "rejected";
  type: "course" | "wallet";
  createdAt: string;
  updatedAt: string;
};

export type TQuiz = {
  id: string;
  sonId: string;
  title: string;
  subject: string;
  status: "passed" | "failed";
  score: number;
};

export type GetSingleSonResponse = {
  id: string;
  img_url: string | null;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  class: {
    id: string;
    name: string;
  };
  wallet: {
    balance: number;
  };
  courses: {
    id: string;
    name: string;
    description: string;
    students: string;
    progress: {
      videosWatched: string;
      totalVideos: string;
      percentage: string | null;
    };
  }[];
  transactions: TTransaction[];
  quizez: TQuiz[];
};

export async function getSons(
  page: string | string[] | undefined = "1",
  limit: number = 10,
  subject?: string | string[] | undefined,
  className?: string | string[] | undefined
) {
  const res = await parentAPI.get<GetSonsResponse>("/sons", {
    params: {
      page,
      limit,
      subject,
      class: className,
    },
  });
  return res.data;
}

export async function getSon(id: string) {
  const res = await parentAPI.get<GetSingleSonResponse>(`/sons/${id}`);
  return res.data;
}

export async function addSon(data: PostSon) {
  const res = await parentAPI.patch<GetSon>("/assign/son", data);
  return res.data;
}
