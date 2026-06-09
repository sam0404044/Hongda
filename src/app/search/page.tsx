import { Suspense } from "react";
import { SearchContent } from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">載入中...</main>}>
      <SearchContent />
    </Suspense>
  );
}
