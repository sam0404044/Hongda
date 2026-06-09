import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { staticPages, staticPageTitles } from "@/lib/static-pages";

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

function getPageKey(slug: string[]) {
  return slug.join("/");
}

export function generateStaticParams() {
  return Object.keys(staticPages).map((key) => ({
    slug: key.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageKey = getPageKey(slug);

  return {
    title: staticPageTitles[pageKey as keyof typeof staticPageTitles] ?? "宏達補習班",
  };
}

export default async function StaticHtmlPage({ params }: PageProps) {
  const { slug } = await params;
  const pageKey = getPageKey(slug);
  const html = staticPages[pageKey as keyof typeof staticPages];

  if (!html) {
    notFound();
  }

  return (
    <div
      className={pageKey === "watch" ? "flex flex-1 flex-col bg-gray-950 text-white" : "flex flex-1 flex-col"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
