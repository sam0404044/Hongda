type JsonObject = Record<string, unknown>;

const baseUrl = process.env.APP_URL || "http://127.0.0.1:3000";
const email = `auth-check-${Date.now()}@example.com`;
const password = "Password123!";
let cookie = "";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function request(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);

  if (cookie) {
    headers.set("Cookie", cookie);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
  });
  const setCookie = response.headers.get("set-cookie");

  if (setCookie) {
    cookie = setCookie.split(";")[0] || cookie;
  }

  const body = (await response.json().catch(() => ({}))) as JsonObject;

  return { response, body };
}

async function postJson(path: string, body: JsonObject) {
  return request(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function patchJson(path: string, body: JsonObject) {
  return request(path, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function main() {
  const register = await postJson("/api/auth/register", {
    name: "Auth Check",
    email,
    password,
    birthday: "1992-03-04",
    phone: "0900000000",
    gender: "OTHER",
  });
  assert(register.response.status === 201, "register should return 201");

  const duplicate = await postJson("/api/auth/register", {
    name: "Auth Check",
    email,
    password,
  });
  assert(duplicate.response.status === 409, "duplicate email should return 409");

  const badLogin = await postJson("/api/auth/login", {
    email,
    password: "wrong-password",
  });
  assert(badLogin.response.status === 401, "bad login should return 401");

  const login = await postJson("/api/auth/login", { email, password });
  assert(login.response.status === 200, "login should return 200");
  assert(cookie.startsWith("hongda_session="), "login should set session cookie");

  const me = await request("/api/auth/me");
  assert(me.response.status === 200, "me should return 200");

  const profile = await patchJson("/api/account/profile", {
    name: "Auth Check Updated",
    birthday: "1993-04-05",
    phone: "0911111111",
    gender: "M",
  });
  assert(profile.response.status === 200, "profile update should return 200");

  const forgot = await postJson("/api/auth/forgot-password", { email });
  assert(forgot.response.status === 200, "forgot password should return 200");
  const resetUrl = forgot.body.resetUrl;
  assert(typeof resetUrl === "string", "forgot password should return a local resetUrl");
  const token = new URL(resetUrl).searchParams.get("token");
  assert(token, "resetUrl should include token");

  const reset = await postJson("/api/auth/reset-password", {
    token,
    password: "NewPassword123!",
  });
  assert(reset.response.status === 200, "reset password should return 200");

  const oldPasswordLogin = await postJson("/api/auth/login", {
    email,
    password,
  });
  assert(oldPasswordLogin.response.status === 401, "old password should stop working");

  const newPasswordLogin = await postJson("/api/auth/login", {
    email,
    password: "NewPassword123!",
  });
  assert(newPasswordLogin.response.status === 200, "new password should work");

  console.log("Auth flow check passed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
