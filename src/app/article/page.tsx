import { Suspense } from "react";
import { ArticleContent } from "./ArticleContent";

export default function ArticlePage() {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">載入中...</main>}>
      <ArticleContent />
    </Suspense>
  );
}
