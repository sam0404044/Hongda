import { Suspense } from "react";
import { CourseDetailContent } from "./CourseDetailContent";

export default function CourseDetailPage() {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">載入中...</main>}>
      <CourseDetailContent />
    </Suspense>
  );
}
