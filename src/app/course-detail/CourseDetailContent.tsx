"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { findCourse } from "@/lib/static-demo-data";
import { formatPrice } from "@/lib/format";

export function CourseDetailContent() {
  const searchParams = useSearchParams();
  const course = findCourse(searchParams.get("slug") ?? undefined);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
      <p className="text-sm text-gray-500">{course.category}</p>
      <h1 className="section-title mt-2">{course.title}</h1>
      <p className="mt-4 leading-7 text-gray-600">{course.description}</p>
      <p className="mt-6 text-2xl font-bold text-primary">{formatPrice(course.priceCents)}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/login" className="btn-primary">
          預約諮詢
        </Link>
        <Link href="/courses" className="btn-outline">
          回課程列表
        </Link>
      </div>
      {course.quizzes.length ? (
        <section className="mt-8 rounded-lg border bg-white p-6">
          <h2 className="text-lg font-bold text-primary">課程檢核示範</h2>
          <ul className="mt-3 space-y-2">
            {course.quizzes.map((quiz) => (
              <li key={quiz} className="text-gray-700">
                {quiz}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
