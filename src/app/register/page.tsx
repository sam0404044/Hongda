"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RegisterState = {
  name: string;
  email: string;
  password: string;
  birthday: string;
  phone: string;
  gender: string;
};

type EmailStatus = "idle" | "checking" | "available" | "taken" | "invalid";

const initialState: RegisterState = {
  name: "",
  email: "",
  password: "",
  birthday: "",
  phone: "",
  gender: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = form.email.trim().toLowerCase();

  useEffect(() => {
    if (!email) {
      return;
    }

    if (!isValidEmail(email)) {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setEmailStatus("checking");

      try {
        const response = await fetch(
          `/api/auth/check-email?email=${encodeURIComponent(email)}`,
          { signal: controller.signal },
        );
        const result = (await response.json()) as {
          available?: boolean;
          message?: string;
        };

        if (!response.ok) {
          setEmailStatus("invalid");
          setEmailMessage(result.message ?? "無法檢查電子郵件。");
          return;
        }

        setEmailStatus(result.available ? "available" : "taken");
        setEmailMessage(result.message ?? "");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setEmailStatus("idle");
        setEmailMessage("目前無法檢查電子郵件。");
      }
    }, 450);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [email]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (emailStatus === "taken") {
      setMessage("這個電子郵件已經註冊過，請直接登入或更換電子郵件。");
      return;
    }

    if (emailStatus === "checking") {
      setMessage("正在檢查電子郵件，請稍候。");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setMessage(result.message ?? "註冊失敗，請確認資料後再試。");
        return;
      }

      router.push("/login?registered=1");
      router.refresh();
    } catch {
      setMessage("無法連線到伺服器，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isEmailBlocked =
    emailStatus === "checking" ||
    emailStatus === "taken" ||
    emailStatus === "invalid";

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-12">
      <h1 className="section-title mb-6">註冊新帳號</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border bg-white p-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">姓名</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            電子郵件
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={(event) => {
              const nextEmail = event.target.value;
              setForm((current) => ({ ...current, email: nextEmail }));
              setEmailMessage("");

              if (!nextEmail.trim()) {
                setEmailStatus("idle");
                return;
              }

              if (!isValidEmail(nextEmail.trim().toLowerCase())) {
                setEmailStatus("invalid");
                setEmailMessage("電子郵件格式不正確。");
                return;
              }

              setEmailStatus("checking");
            }}
            aria-describedby="email-status"
            className={`mt-1 w-full rounded-lg border px-3 py-2 ${
              emailStatus === "taken" || emailStatus === "invalid"
                ? "border-red-500"
                : emailStatus === "available"
                  ? "border-green-600"
                  : ""
            }`}
          />
          {emailStatus === "checking" ? (
            <p id="email-status" className="mt-1 text-sm text-gray-500">
              檢查中...
            </p>
          ) : emailMessage ? (
            <p
              id="email-status"
              className={`mt-1 text-sm ${
                emailStatus === "available" ? "text-green-700" : "text-red-700"
              }`}
            >
              {emailMessage}
            </p>
          ) : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">密碼</label>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">生日</label>
          <input
            type="date"
            name="birthday"
            value={form.birthday}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                birthday: event.target.value,
              }))
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">電話</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={(event) =>
              setForm((current) => ({ ...current, phone: event.target.value }))
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">性別</label>
          <select
            name="gender"
            value={form.gender}
            onChange={(event) =>
              setForm((current) => ({ ...current, gender: event.target.value }))
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          >
            <option value="">請選擇</option>
            <option value="M">男</option>
            <option value="F">女</option>
            <option value="OTHER">其他</option>
          </select>
        </div>

        {message ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting || isEmailBlocked}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "註冊中..." : "註冊"}
        </button>
        <p className="text-center text-sm text-gray-600">
          已有帳號？
          <Link href="/login" className="text-primary hover:underline">
            登入
          </Link>
        </p>
      </form>
    </main>
  );
}
