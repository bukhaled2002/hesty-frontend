import { hestyAPI } from "./axios";

export async function sendOtp(email: string) {
  const res = await hestyAPI.post("/forgot-password", {
    email,
  });
  return res.data;
}

export async function resendOtp(email: string) {
  const res = await hestyAPI.post("/forgot-password", {
    email,
  });
  return res.data;
}

export async function verifyOtp(email: string, OTP: string) {
  const res = await hestyAPI.post("/verify-otp", {
    email,
    OTP,
  });
  return res.data;
}

export async function resetPassword(
  email: string,
  OTP: string,
  newPassword: string,
  confirmPassword: string
) {
  const res = await hestyAPI.put("/reset-password", {
    email,
    OTP,
    newPassword,
    confirmPassword,
  });
  return res.data;
}
