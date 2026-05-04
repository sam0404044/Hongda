import { LoginForm } from "./LoginForm";

type LoginPageProps = {
  searchParams: Promise<{
    registered?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-12">
      <h1 className="section-title mb-6">會員登入</h1>
      <LoginForm registered={params.registered === "1"} />
    </main>
  );
}
