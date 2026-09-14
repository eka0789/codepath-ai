"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginWithCredentials(
  _prevState: { error: string } | undefined,
  formData: FormData
): Promise<{ error: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password harus diisi" };
  }

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    return { error: "Email atau password salah" };
  }

  redirect("/dashboard");
}
