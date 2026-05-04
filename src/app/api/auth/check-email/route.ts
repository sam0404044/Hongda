import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = (searchParams.get("email") ?? "").trim().toLowerCase();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { available: false, message: "電子郵件格式不正確。" },
      { status: 400 },
    );
  }

  const exists = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return NextResponse.json({
    available: !exists,
    message: exists ? "這個電子郵件已經註冊過。" : "這個電子郵件可以使用。",
  });
}
