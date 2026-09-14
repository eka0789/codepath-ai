import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | CodePath AI",
  description: "Buat akun CodePath AI baru.",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
