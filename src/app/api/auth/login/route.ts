import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = normalizeString(body.email).toLowerCase();
    const password = normalizeString(body.password);

    if (!email || !password) {
      return NextResponse.json(
        { message: "請輸入電子郵件與密碼。" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "電子郵件或密碼不正確。" },
        { status: 401 },
      );
    }

    const isPasswordValid = await compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "電子郵件或密碼不正確。" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      message: "登入成功。",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: createSessionToken(user),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login failed", error);

    return NextResponse.json(
      { message: "登入失敗，請稍後再試。" },
      { status: 500 },
    );
  }
}
