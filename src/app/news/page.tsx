import Link from "next/link";
import { demoArticles } from "@/lib/static-demo-data";
import { formatDate } from "@/lib/format";

export default function NewsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <h1 className="section-title mb-6">最新文章</h1>
      <section className="space-y-4">
        {demoArticles.map((article) => (
          <article key={article.id} className="rounded-lg border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{formatDate(article.publishedAt)}</p>
            <h2 className="mt-2 text-xl font-bold text-primary">{article.title}</h2>
            <p className="mt-2 leading-7 text-gray-600">{article.excerpt}</p>
            <Link href={`/article?slug=${article.slug}`} className="mt-4 inline-block text-primary hover:underline">
              閱讀文章
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
