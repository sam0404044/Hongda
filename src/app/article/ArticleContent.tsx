"use client";

import { useSearchParams } from "next/navigation";
import { findArticle } from "@/lib/static-demo-data";
import { formatDate } from "@/lib/format";

export function ArticleContent() {
  const searchParams = useSearchParams();
  const article = findArticle(searchParams.get("slug") ?? undefined);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
      <p className="text-sm text-gray-500">{formatDate(article.publishedAt)}</p>
      <h1 className="section-title mt-2">{article.title}</h1>
      <article className="mt-6 whitespace-pre-wrap leading-8 text-gray-700">{article.content}</article>
    </main>
  );
}
