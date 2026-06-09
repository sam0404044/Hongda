import { createHash, randomBytes } from "crypto";

export function createPasswordResetToken() {
  const token = randomBytes(32).toString("base64url");

  return {
    token,
    tokenHash: hashPasswordResetToken(token),
  };
}

export function hashPasswordResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getPasswordResetExpiry() {
  return new Date(Date.now() + 1000 * 60 * 30);
}
