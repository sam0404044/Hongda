import type { Metadata } from "next";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "宏達補習班",
  description: "宏達補習班靜態展示版，提供課程、師資、文章與學員回饋瀏覽。",
  icons: {
    icon: "/brand/hongda-logo-vertical-color.png",
    shortcut: "/brand/hongda-logo-vertical-color.png",
    apple: "/brand/hongda-logo-vertical-color.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="h-full">
      <body className="flex min-h-screen flex-col text-gray-800 antialiased">
        <NavBar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
