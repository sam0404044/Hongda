"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/about", label: "關於我們" },
  { href: "/courses", label: "課程列表" },
  { href: "/news", label: "最新消息" },
  { href: "/testimonials", label: "學員見證" },
  { href: "/cart", label: "購物車" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center" aria-label="宏達升學教育機構首頁">
            <Image
              src="/brand/hongda-logo-horizontal-color.png"
              alt="宏達升學教育機構"
              width={2172}
              height={724}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </Link>

          <nav className="hidden items-center gap-6 text-base md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive(pathname, item.href)
                    ? "font-medium text-primary"
                    : "text-gray-600 hover:text-primary"
                }
              >
                {item.label}
              </Link>
            ))}
            <form action="/search" method="get" className="hidden items-center xl:inline-flex">
              <input
                type="search"
                name="q"
                placeholder="搜尋課程、文章..."
                className="w-36 rounded-l border border-gray-300 px-2 py-1.5 text-sm focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-r border border-l-0 border-gray-300 bg-gray-100 px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-200"
              >
                搜尋
              </button>
            </form>
            <Link href="/login" className="btn-primary">
              會員登入
            </Link>
          </nav>

          <button
            type="button"
            aria-label={isOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 md:hidden"
          >
            <span className="sr-only">{isOpen ? "關閉選單" : "開啟選單"}</span>
            <span className="flex flex-col gap-1.5" aria-hidden="true">
              <span
                className={`block h-0.5 w-5 rounded bg-current transition ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded bg-current transition ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded bg-current transition ${
                  isOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`overflow-hidden border-t border-gray-100 transition-[max-height,opacity] duration-200 md:hidden ${
            isOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-3 py-2 text-base ${
                  isActive(pathname, item.href)
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <form action="/search" method="get" className="mt-2 flex px-3">
              <input
                type="search"
                name="q"
                placeholder="搜尋課程、文章..."
                className="min-w-0 flex-1 rounded-l border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-r border border-l-0 border-gray-300 bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
              >
                搜尋
              </button>
            </form>
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="btn-primary mx-3 mt-2 text-center"
            >
              會員登入
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
