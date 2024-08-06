import { hestyAPI } from "../axios";

export type GetCheckOutResponse = {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  img_url: string;
  num_hours: string;
  count_lectures: string;
  price: string;
  price_after_discount: string;
  createdAt: string;
  updatedAt: string;
  subjectId: string;
  subject: {
    id: string;
    name: string;
  };
  class: {
    id: string;
    name: string;
  };
  wallet: {
    id: string;
    balance: number;
  };
};

export async function checkOut(courseId: string) {
  const res = await hestyAPI.get<GetCheckOutResponse>(
    `/course/checkout-details/${courseId}`
  );
  return res.data;
}

export async function payCourse(courseId: string) {
  const res = await hestyAPI.post(`/course/checkout-submit/${courseId}`);
  return res.data;
}
