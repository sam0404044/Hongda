"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type ResetPasswordFormProps = {
  token: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const result = (await response.json()) as { message?: string };

      setMessage(result.message ?? "密碼已更新。");
      setIsComplete(response.ok);
    } catch {
      setMessage("目前無法連線，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">缺少密碼重設 token。</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-white p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">新密碼</label>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 w-full rounded-lg border px-3 py-2"
        />
      </div>
      {message ? (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>
      ) : null}
      {isComplete ? (
        <Link href="/login" className="btn-primary block text-center">
          前往登入
        </Link>
      ) : (
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
          {isSubmitting ? "更新中..." : "更新密碼"}
        </button>
      )}
    </form>
  );
}
