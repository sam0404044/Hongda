import { aboutContent } from "@/lib/static-demo-data";

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <h1 className="section-title mb-8">{aboutContent.title}</h1>
      <article className="space-y-4 leading-8 text-gray-700">
        {aboutContent.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>
    </main>
  );
}
