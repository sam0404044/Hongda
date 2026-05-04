import type { Metadata } from "next";
import Script from "next/script";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "宏達升學教育機構",
  description: "宏達補習班升學教育網站",
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
      <body className="min-h-screen flex flex-col text-gray-800 antialiased">
        <NavBar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
