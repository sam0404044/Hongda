import Link from "next/link";

type StaticModeNoticeProps = {
  title: string;
  description?: string;
};

export function StaticModeNotice({ title, description }: StaticModeNoticeProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-12">
      <section className="rounded-lg border bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/70">
          Static Demo
        </p>
        <h1 className="section-title mt-3">{title}</h1>
        <p className="mt-4 leading-7 text-gray-600">
          {description ??
            "這個 GitHub Pages 版本是靜態展示版，無法使用登入、購物車、後台或資料庫功能。"}
        </p>
        <Link href="/courses" className="btn-primary mt-6">
          瀏覽展示課程
        </Link>
      </section>
    </main>
  );
}
