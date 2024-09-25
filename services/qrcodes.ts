import { adminAPI, hestyAPI } from "./axios";
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

export async function CreateNewQrCode(courseId: string, limit_qrCode: number) {
  const res = await adminAPI.post(`/courses/generateQrCode/${courseId}?limit_qrCode=${limit_qrCode}`);
  return res.data;
}
export async function CheckoutWithQrCode(courseId: string, code: number) {
  const res = await hestyAPI.post(`/course/checkout-submit-withCode/${courseId}?code=${code}`);
  return res.data;
}

export async function GetQrCodes(courseId: string): Promise<QrCode[]> {
  try {
    const res = await adminAPI.get(`/courses/getQrCodes/${courseId}`);
    return res.data as QrCode[];
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
}

export async function DeleteQrCode(ids: string[]) {
  try {
    const res = await adminAPI.delete(`/courses/delete/QrCodes`, {
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
