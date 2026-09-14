import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | CodePath AI",
  description: "Masuk ke akun CodePath AI kamu.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
