"use server";

import { signIn } from "@/lib/auth";

export async function loginWithCredentials(
  _prevState: { error: string } | undefined,
  formData: FormData
): Promise<{ error: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password harus diisi" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (e: unknown) {
    if (e && typeof e === "object" && "digest" in e) {
      const digest = (e as { digest: string }).digest;
      if (digest.includes("NEXT_REDIRECT")) {
        throw e;
      }
    }
    return { error: "Email atau password salah" };
  }

  return { error: "" };
}
