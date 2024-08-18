import { adminAPI, hestyAPI } from "../axios";
import { MetaData } from "../types";

export type BaseBook = {
  img_url: string;
  name: string;
  description: string;
  students_count: number;
};

export type GetBook = BaseBook & {
  id: string;
  price: string;
  google_form_url: string;
  author: string;
  bookChapters: {
    title:string;
    content:string
  }[]

};

export type PostBook = Omit<BaseBook, "students_count"> & {
  price: string;
  google_form_url: string;
  author: string;
  bookChapters: {
    id?:string;
    title:string;
    content:string
  }[]
};

export type GetSingleBookResponse = {
  id: string;
  name: string;
  description: string;
  img_url: string;
  price: string;
  google_form_url: string;
  updatedAt:string;
  bookChapters: {
    id?:string;
    title:string;
    content:string
  }[];
author:string;
};

export type GetBooksResponse = {
  count: number;
  data: GetBook[];
  meta: MetaData;
};

export async function getBooks( page: string | string[] | undefined = "1", author?: string | string[] | undefined,  name?: string | string[] | undefined, limit: number = 10) {
  const res = await adminAPI.get<GetBooksResponse>("/book/all", {
    params: {
      page,
      limit,
      name,
      author
    },
  });
  return res.data;
}

export async function getbook(id: string) {
  const res = await adminAPI.get<GetSingleBookResponse>(`/book/${id}`);
  return res.data;
}

export async function createBook(book: PostBook) {
  const res = await adminAPI.post<GetBook>("/book/create", book);
  return res.data;
}

export async function updateBook(id: string, course: Partial<PostBook>) {
  const res = await adminAPI.patch<GetBook>(`/book/${id}`, course);
  return res.data;
}

export async function deleteBook(id: string) {
  await adminAPI.delete(`/book/${id}`);
}
export async function deleteChapters(id: string , data:any) {
  await adminAPI.delete(`/book/chapters/${id}` , data);
}
