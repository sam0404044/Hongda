export const staticPages = {
  checkout: `
    <main class="mx-auto max-w-4xl flex-1 px-4 py-12">
      <h1 class="section-title mb-6">結帳功能</h1>
      <div class="rounded-lg border bg-white p-8 text-gray-600">
        <p>這個 GitHub Pages 版本是靜態展示版，無法處理購物車、訂單或金流。</p>
      </div>
    </main>
  `,
  "checkout-result": `
    <main class="mx-auto max-w-4xl flex-1 px-4 py-12">
      <h1 class="section-title mb-6">結帳結果</h1>
      <div class="rounded-lg border bg-white p-8 text-gray-600">
        <p>靜態展示版沒有訂單資料。正式版本請部署到支援後端的環境。</p>
      </div>
    </main>
  `,
  "instructor-detail": `
    <main class="mx-auto max-w-3xl flex-1 px-4 py-12">
      <h1 class="section-title mb-6">師資詳細資料</h1>
      <p class="text-gray-600">請回到師資介紹頁瀏覽展示資料。</p>
    </main>
  `,
  quiz: `
    <main class="mx-auto max-w-lg flex-1 px-4 py-12">
      <h1 class="section-title mb-6">課程測驗</h1>
      <div class="rounded-lg border bg-white p-8 text-gray-600">
        <p>測驗功能需要登入與資料庫，未在靜態展示版啟用。</p>
      </div>
    </main>
  `,
  "quiz-result": `
    <main class="mx-auto max-w-lg flex-1 px-4 py-12">
      <h1 class="section-title mb-6">測驗結果</h1>
      <div class="rounded-lg border bg-white p-8 text-gray-600">
        <p>靜態展示版不保存測驗結果。</p>
      </div>
    </main>
  `,
  watch: `
    <main class="mx-auto max-w-5xl flex-1 px-4 py-12">
      <h1 class="section-title mb-6">課程觀看</h1>
      <div class="rounded-lg border border-gray-700 bg-gray-900 p-8 text-gray-200">
        <p>影片觀看需要會員授權與後端服務，未在靜態展示版啟用。</p>
      </div>
    </main>
  `,
} as const;

export const staticPageTitles = {
  checkout: "結帳功能 | 宏達補習班",
  "checkout-result": "結帳結果 | 宏達補習班",
  "instructor-detail": "師資詳細資料 | 宏達補習班",
  quiz: "課程測驗 | 宏達補習班",
  "quiz-result": "測驗結果 | 宏達補習班",
  watch: "課程觀看 | 宏達補習班",
} as const;

export type StaticPageSlug = keyof typeof staticPages;
