"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type CartRemoveButtonProps = {
  itemId: number;
};

export function CartRemoveButton({ itemId }: CartRemoveButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRemove() {
    setIsSubmitting(true);

    try {
      await fetch(`/api/cart/items/${itemId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={isSubmitting}
      className="text-sm text-red-600 hover:underline disabled:opacity-60"
    >
      {isSubmitting ? "移除中..." : "移除"}
    </button>
  );
}
