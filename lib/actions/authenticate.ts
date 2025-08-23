"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(data: {
  username: string;
  password: string;
  role: "student" | "parent" | "admin" | "teacher";
}) {
  try {
    console.log(data);
    await signIn("credentials", {
      ...data,
      redirect: false,
    });
    return true;
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
