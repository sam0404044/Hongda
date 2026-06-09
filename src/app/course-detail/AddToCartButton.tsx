"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AddToCartButtonProps = {
  courseId: number;
};

export function AddToCartButton({ courseId }: AddToCartButtonProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddToCart() {
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const result = (await response.json()) as { message?: string };

      if (response.status === 401) {
        router.push("/login?redirect=%2Fcart");
        return;
      }

      if (!response.ok) {
        setMessage(result.message ?? "加入購物車失敗。");
        return;
      }

      router.push("/cart");
      router.refresh();
    } catch {
      setMessage("目前無法連線，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isSubmitting}
        className="btn-primary disabled:opacity-60"
      >
        {isSubmitting ? "加入中..." : "加入購物車"}
      </button>
      {message ? <p className="mt-2 text-sm text-red-600">{message}</p> : null}
    </div>
  );
}
