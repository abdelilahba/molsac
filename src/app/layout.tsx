import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mol Sac - مول الصاك",
  description: "Bags, Shoes & Accessories shop in Tétouan, Morocco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
