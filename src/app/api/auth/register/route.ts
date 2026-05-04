import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = normalizeString(body.name);
    const email = normalizeString(body.email).toLowerCase();
    const password = normalizeString(body.password);
    const birthday = normalizeString(body.birthday);
    const phone = normalizeString(body.phone);
    const gender = normalizeString(body.gender);

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "請填寫姓名、電子郵件與密碼。" },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "電子郵件格式不正確。" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "密碼至少需要 8 個字元。" },
        { status: 400 },
      );
    }

    const exists = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (exists) {
      return NextResponse.json(
        { message: "這個電子郵件已經註冊過。" },
        { status: 409 },
      );
    }

    const passwordHash = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        birthday: birthday ? new Date(`${birthday}T00:00:00.000Z`) : null,
        phone: phone || null,
        gender: gender || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        message: "註冊成功。",
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register failed", error);

    return NextResponse.json(
      { message: "註冊失敗，請稍後再試。" },
      { status: 500 },
    );
  }
}
