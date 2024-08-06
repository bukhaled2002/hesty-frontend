"use server";

import { auth } from "@/auth";

export async function getToken() {
  const data = await auth();
  return data?.user.access_token;
}
