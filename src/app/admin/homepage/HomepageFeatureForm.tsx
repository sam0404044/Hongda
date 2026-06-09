"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SectionKey = "courseSlots" | "instructorSlots" | "articleSlots";

type FeatureOption = {
  id: number;
  title: string;
  meta?: string | null;
};

type FeatureSlot = {
  id: number;
  sortOrder: number;
};

type SectionState = Record<number, { selected: boolean; sortOrder: number }>;

type HomepageFeatureFormProps = {
  courses: FeatureOption[];
  instructors: FeatureOption[];
  articles: FeatureOption[];
  initialSelections: Record<SectionKey, FeatureSlot[]>;
};

const sectionConfig: Array<{
  key: SectionKey;
  title: string;
  description: string;
  emptyText: string;
}> = [
  {
    key: "courseSlots",
    title: "首頁課程",
    description: "選擇要出現在首頁的課程卡片。",
    emptyText: "目前沒有可選課程，請先建立課程資料。",
  },
  {
    key: "instructorSlots",
    title: "首頁師資",
    description: "選擇要出現在首頁的師資介紹。",
    emptyText: "目前沒有可選師資，請先建立師資資料。",
  },
  {
    key: "articleSlots",
    title: "首頁文章",
    description: "選擇要出現在首頁的最新消息或文章。",
    emptyText: "目前沒有可選文章，請先建立文章資料。",
  },
];

function createInitialState(options: FeatureOption[], slots: FeatureSlot[]) {
  const selectedMap = new Map(slots.map((slot) => [slot.id, slot.sortOrder]));

  return options.reduce<SectionState>((state, option, index) => {
    state[option.id] = {
      selected: selectedMap.has(option.id),
      sortOrder: selectedMap.get(option.id) ?? index + 1,
    };
    return state;
  }, {});
}

function toPayloadItems(state: SectionState) {
  return Object.entries(state)
    .filter(([, value]) => value.selected)
    .map(([id, value]) => ({
      id: Number(id),
      sortOrder: Number.isInteger(value.sortOrder) && value.sortOrder > 0 ? value.sortOrder : 1,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
}

export function HomepageFeatureForm({
  courses,
  instructors,
  articles,
  initialSelections,
}: HomepageFeatureFormProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sections, setSections] = useState<Record<SectionKey, SectionState>>({
    courseSlots: createInitialState(courses, initialSelections.courseSlots),
    instructorSlots: createInitialState(instructors, initialSelections.instructorSlots),
    articleSlots: createInitialState(articles, initialSelections.articleSlots),
  });

  const optionsBySection: Record<SectionKey, FeatureOption[]> = {
    courseSlots: courses,
    instructorSlots: instructors,
    articleSlots: articles,
  };

  function updateItem(
    sectionKey: SectionKey,
    itemId: number,
    patch: Partial<{ selected: boolean; sortOrder: number }>,
  ) {
    setSections((current) => ({
      ...current,
      [sectionKey]: {
        ...current[sectionKey],
        [itemId]: {
          ...current[sectionKey][itemId],
          ...patch,
        },
      },
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlots: toPayloadItems(sections.courseSlots),
          instructorSlots: toPayloadItems(sections.instructorSlots),
          articleSlots: toPayloadItems(sections.articleSlots),
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setMessage(result.message ?? "首頁精選更新失敗。");
        return;
      }

      setMessage(result.message ?? "首頁精選已更新。");
      router.refresh();
    } catch {
      setMessage("連線失敗，請稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {sectionConfig.map((section) => {
        const options = optionsBySection[section.key];

        return (
          <section key={section.key} className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-primary">{section.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{section.description}</p>
            </div>

            {options.length ? (
              <div className="space-y-3">
                {options.map((option) => {
                  const itemState = sections[section.key][option.id];

                  return (
                    <label
                      key={option.id}
                      className="grid gap-3 rounded-xl border px-4 py-3 sm:grid-cols-[minmax(0,1fr)_8rem] sm:items-center"
                    >
                      <span className="flex min-w-0 items-start gap-3">
                        <input
                          type="checkbox"
                          checked={itemState.selected}
                          onChange={(event) =>
                            updateItem(section.key, option.id, {
                              selected: event.target.checked,
                            })
                          }
                          className="mt-1"
                        />
                        <span className="min-w-0">
                          <span className="block font-medium text-gray-900">{option.title}</span>
                          {option.meta ? (
                            <span className="mt-1 block text-sm text-gray-500">{option.meta}</span>
                          ) : null}
                        </span>
                      </span>
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        排序
                        <input
                          type="number"
                          min="1"
                          value={itemState.sortOrder}
                          disabled={!itemState.selected}
                          onChange={(event) =>
                            updateItem(section.key, option.id, {
                              sortOrder: Number(event.target.value),
                            })
                          }
                          className="w-20 rounded-lg border px-2 py-1 disabled:bg-gray-100"
                        />
                      </span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-xl bg-gray-50 px-4 py-5 text-sm text-gray-500">
                {section.emptyText}
              </p>
            )}
          </section>
        );
      })}

      {message ? (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{message}</p>
      ) : null}

      <button type="submit" disabled={isSubmitting} className="btn-primary disabled:opacity-60">
        {isSubmitting ? "儲存中..." : "儲存首頁精選"}
      </button>
    </form>
  );
}
