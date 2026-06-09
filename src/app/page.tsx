import Image from "next/image";
import Link from "next/link";
import { demoArticles, demoCourses, demoInstructors } from "@/lib/static-demo-data";
import { formatDate, formatPrice } from "@/lib/format";

const placeholderImages = {
  hero: "/images/placeholders/home-hero.svg",
  course: "/images/placeholders/home-course.svg",
  instructor: "/images/placeholders/home-instructor.svg",
  article: "/images/placeholders/home-article.svg",
};

export default function HomePage() {
  return (
    <main className="flex-1 bg-[#f8f5ed]">
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary shadow-xl">
          <Image
            src={placeholderImages.hero}
            alt="宏達補習班課程展示"
            width={1200}
            height={720}
            priority
            className="h-[24rem] w-full object-cover md:h-[34rem]"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent">
            <div className="max-w-3xl p-8 text-white md:p-12">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#f3d59a]">
                Hongda Featured
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
                穩定打底，讓每一次練習都看得見進步
              </h1>
              <p className="mt-4 text-base leading-7 text-white/85 md:text-lg">
                這是宏達補習班的 GitHub Pages 靜態展示版，提供課程、師資、文章與學員回饋瀏覽。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/courses" className="btn-primary bg-[#f3d59a] text-primary hover:bg-[#f7dfaa]">
                  瀏覽課程
                </Link>
                <Link href="/about" className="btn-outline border-white text-white hover:bg-white/10">
                  了解宏達
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeader eyebrow="Courses" title="精選課程" href="/courses" linkLabel="查看全部課程" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {demoCourses.map((course) => (
            <article key={course.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <Image
                src={placeholderImages.course}
                alt={`${course.title} 課程圖片`}
                width={800}
                height={500}
                className="h-44 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-sm text-gray-500">{course.category}</p>
                <h3 className="mt-2 font-bold text-primary">{course.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{course.description}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-bold text-primary">{formatPrice(course.priceCents)}</span>
                  <Link href={`/course-detail?slug=${course.slug}`} className="text-sm text-primary hover:underline">
                    詳細
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y bg-white/70">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <SectionHeader eyebrow="Instructors" title="師資介紹" href="/instructors" linkLabel="查看師資" />
          <div className="grid gap-5 md:grid-cols-3">
            {demoInstructors.map((instructor) => (
              <article key={instructor.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                <Image
                  src={instructor.avatarUrl}
                  alt={instructor.name}
                  width={800}
                  height={500}
                  className="h-56 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-sm text-gray-500">{instructor.title}</p>
                  <h3 className="mt-2 text-xl font-bold text-primary">{instructor.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{instructor.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeader eyebrow="Articles" title="最新文章" href="/news" linkLabel="閱讀更多文章" />
        <div className="grid gap-5 md:grid-cols-3">
          {demoArticles.map((article) => (
            <article key={article.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <Image
                src={placeholderImages.article}
                alt={`${article.title} 文章圖片`}
                width={800}
                height={500}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <p className="text-sm text-gray-500">{formatDate(article.publishedAt)}</p>
                <h3 className="mt-2 font-bold text-primary">{article.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{article.excerpt}</p>
                <Link href={`/article?slug=${article.slug}`} className="mt-4 inline-block text-primary hover:underline">
                  閱讀文章
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/70">{eyebrow}</p>
        <h2 className="section-title mt-2">{title}</h2>
      </div>
      <Link href={href} className="text-primary hover:underline">
        {linkLabel}
      </Link>
    </div>
  );
}
