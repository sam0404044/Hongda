"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type ProfileFormProps = {
  user: {
    name: string;
    email: string;
    birthday: string;
    phone: string;
    gender: string;
  };
};

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [form, setForm] = useState(user);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        message?: string;
        user?: ProfileFormProps["user"];
      };

      if (!response.ok) {
        setMessage(result.message ?? "會員資料更新失敗。");
        return;
      }

      if (result.user) {
        setForm(result.user);
      }

      setMessage(result.message ?? "會員資料已更新。");
      router.refresh();
    } catch {
      setMessage("目前無法連線，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-lg border bg-white p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">姓名</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={form.email}
          disabled
          className="mt-1 w-full rounded-lg border bg-gray-50 px-3 py-2 text-gray-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">生日</label>
        <input
          type="date"
          value={form.birthday}
          onChange={(event) => setForm((current) => ({ ...current, birthday: event.target.value }))}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">電話</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">性別</label>
        <select
          value={form.gender}
          onChange={(event) => setForm((current) => ({ ...current, gender: event.target.value }))}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        >
          <option value="">不指定</option>
          <option value="M">男</option>
          <option value="F">女</option>
          <option value="OTHER">其他</option>
        </select>
      </div>
      {message ? (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>
      ) : null}
      <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
        {isSubmitting ? "儲存中..." : "儲存會員資料"}
      </button>
    </form>
  );
}
