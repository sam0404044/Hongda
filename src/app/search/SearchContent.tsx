"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { demoArticles, demoCourses } from "@/lib/static-demo-data";
import { formatDate, formatPrice } from "@/lib/format";

export function SearchContent() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const courses = demoCourses.filter((course) =>
    [course.title, course.description, course.category].some((value) => value.toLowerCase().includes(query)),
  );
  const articles = demoArticles.filter((article) =>
    [article.title, article.excerpt, article.content].some((value) => value.toLowerCase().includes(query)),
  );

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <h1 className="section-title mb-6">搜尋</h1>
      <form action="/search" className="mb-8 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={searchParams.get("q") ?? ""}
          placeholder="搜尋課程或文章"
          className="min-w-0 flex-1 rounded-lg border px-4 py-2"
        />
        <button type="submit" className="btn-primary">
          搜尋
        </button>
      </form>

      <section className="space-y-8">
        <div>
          <h2 className="mb-3 text-lg font-bold text-primary">課程</h2>
          <div className="space-y-3">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/course-detail?slug=${course.slug}`}
                className="block rounded-lg border bg-white p-4 hover:border-primary"
              >
                <p className="font-bold text-primary">{course.title}</p>
                <p className="mt-1 text-sm text-gray-600">{course.category}</p>
                <p className="mt-2 text-sm text-gray-500">{formatPrice(course.priceCents)}</p>
              </Link>
            ))}
            {!courses.length ? <p className="text-sm text-gray-500">沒有找到符合的課程。</p> : null}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-primary">文章</h2>
          <div className="space-y-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/article?slug=${article.slug}`}
                className="block rounded-lg border bg-white p-4 hover:border-primary"
              >
                <p className="font-bold text-primary">{article.title}</p>
                <p className="mt-1 text-sm text-gray-600">{article.excerpt}</p>
                <p className="mt-2 text-sm text-gray-500">{formatDate(article.publishedAt)}</p>
              </Link>
            ))}
            {!articles.length ? <p className="text-sm text-gray-500">沒有找到符合的文章。</p> : null}
          </div>
        </div>
      </section>
    </main>
  );
}
