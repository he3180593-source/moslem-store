import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MOSLEM STORE | مستحضرات التجميل والمستلزمات الطبية",
  description:
    "اكتشف منتجات التجميل والعناية الشخصية والمستلزمات الطبية في MOSLEM STORE.",
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
