import Link from "next/link";
import { demoCourses } from "@/lib/static-demo-data";
import { formatPrice } from "@/lib/format";

export default function CoursesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10">
      <h1 className="section-title mb-6">課程總覽</h1>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {demoCourses.map((course) => (
          <article key={course.id} className="rounded-lg border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{course.category}</p>
            <h2 className="mt-2 text-xl font-bold text-primary">{course.title}</h2>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{course.description}</p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="font-bold text-primary">{formatPrice(course.priceCents)}</span>
              <Link href={`/course-detail?slug=${course.slug}`} className="btn-primary">
                查看課程
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
