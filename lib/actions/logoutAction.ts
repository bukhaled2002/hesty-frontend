"use server";
import { signOut } from "@/auth";

export async function logoutAction() {
  try {
    await signOut({
      redirectTo: "/",
    });
    return true;
  } catch (error) {
    throw error;
  }
}
