import { demoTestimonials } from "@/lib/static-demo-data";

export default function TestimonialsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10">
      <h1 className="section-title mb-6">學員回饋</h1>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {demoTestimonials.map((testimonial) => (
          <article key={testimonial.id} className="rounded-lg border bg-white p-6 shadow-sm">
            <p className="leading-7 text-gray-700">「{testimonial.quote}」</p>
            <p className="mt-4 font-bold text-primary">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.context}</p>
            <p className="mt-2 text-sm text-gray-600">課程：{testimonial.courseTitle}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
