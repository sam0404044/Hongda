import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getSessionUser() {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(SESSION_COOKIE_NAME)?.value);

  if (!session) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      birthday: true,
      phone: true,
      gender: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function getRequiredSessionUser() {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  return user;
}

export async function getRequiredAdminUser() {
  const user = await getSessionUser();

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return user;
}
