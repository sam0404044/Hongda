"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  registered?: boolean;
  redirectTo?: string;
};

export function LoginForm({ registered = false, redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setMessage(result.message ?? "登入失敗，請確認帳號與密碼。");
        return;
      }

      const nextPath =
        redirectTo?.startsWith("/") && !redirectTo.startsWith("//")
          ? redirectTo
          : "/account";

      router.push(nextPath);
      router.refresh();
    } catch {
      setMessage("目前無法連線，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6">
      {registered ? (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
          註冊成功，請使用剛剛建立的帳號登入。
        </p>
      ) : null}
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">密碼</label>
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>

      {message ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{message}</p>
      ) : null}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
        {isSubmitting ? "登入中..." : "登入"}
      </button>
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2 text-gray-400"
        disabled
      >
        Google 快速登入
      </button>
      <div className="flex justify-between text-sm">
        <Link href="/forgot-password" className="text-primary hover:underline">
          忘記密碼
        </Link>
        <Link href="/register" className="text-primary hover:underline">
          建立帳號
        </Link>
      </div>
    </form>
  );
}
