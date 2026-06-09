"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  isPublished: true,
};

export function ArticleCreateForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setMessage(result.message ?? "文章新增失敗。");
        return;
      }

      setForm(initialForm);
      setMessage(result.message ?? "文章已新增。");
      router.refresh();
    } catch {
      setMessage("目前無法連線，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">標題</label>
        <input
          required
          value={form.title}
          onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">網址 Slug</label>
        <input
          value={form.slug}
          onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))}
          placeholder="留空會依標題自動產生"
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">摘要</label>
        <textarea
          value={form.excerpt}
          onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value }))}
          rows={3}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">內容</label>
        <textarea
          required
          value={form.content}
          onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
          rows={8}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.isPublished}
          onChange={(event) => setForm((current) => ({ ...current, isPublished: event.target.checked }))}
        />
        立即發布到最新消息
      </label>
      {message ? (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>
      ) : null}
      <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
        {isSubmitting ? "新增中..." : "新增文章"}
      </button>
    </form>
  );
}
