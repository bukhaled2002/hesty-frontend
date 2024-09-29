import { adminAPI, hestyAPI } from "../axios";
export type PostQuiz = {
  title: string;
  duration: string;
  lectureId: string;
  questions: {
    question: string;
    figure?: string[];
    choices: {
      answer: string;
      isCorrect: boolean;
    }[];
  }[];
};
export type QrCode = {
  id: string;
  code: string;
  courseId: string;
  isUsed: boolean;
  lectureId: string | null;
  num_used: number;
  createdAt: string;
  updatedAt: string;
};

export async function CreateNewQrCode(lectureId: string, limit_qrCode: number, num_used:number) {
  const res = await adminAPI.post(`/lectures/generateQrCode/${lectureId}?limit_qrCode=${limit_qrCode}&num_used=${num_used}`);
  return res.data;
}
export async function CheckoutWithQrCode(lectureId: string, code: number) {
  const res = await hestyAPI.post(`/lectures/checkout-submit-withCode/${lectureId}?code=${code}`);
  return res.data;
}
export async function SearchLectureWithCode(code: string) {
  const res = await hestyAPI.get(`/lecture/getByCode/${code}`);
  return res.data;
}
export async function OpenLectureWithCode(qrCode: string) {
  const res = await hestyAPI.get(`/lecture/enterLecture/${qrCode}`);
  return res.data;
}

export async function GetQrCodes(lectureId: string): Promise<QrCode[]> {
  try {
    const res = await adminAPI.get(`/lectures/getQrCodes/${lectureId}`);
    return res.data as QrCode[];
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
}

export async function DeleteQrCode(ids: string[]) {
  try {
    const res = await adminAPI.delete(`/lectures/deleteQrCodes`, {
      data: {
        ids: ids,
      },
    });
    console.log("QR code deleted successfully:", res);
    return res.data;
  } catch (error) {
    console.error("Error deleting QR code:", error);
    throw error;
  }
}
