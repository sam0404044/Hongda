import Image from "next/image";
import { demoInstructors } from "@/lib/static-demo-data";

export default function InstructorsPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Instructors</p>
        <h1 className="section-title mt-2">師資介紹</h1>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
          展示版列出主要授課老師與教學特色。完整班級安排與時段請以正式部署後台資料為準。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {demoInstructors.map((instructor) => (
          <article key={instructor.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <Image
              src={instructor.avatarUrl}
              alt={instructor.name}
              width={800}
              height={500}
              className="h-56 w-full object-cover"
            />
            <div className="p-5">
              <p className="text-sm text-gray-500">{instructor.title}</p>
              <h2 className="mt-2 text-xl font-bold text-primary">{instructor.name}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">{instructor.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
