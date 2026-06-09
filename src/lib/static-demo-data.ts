export type DemoCourse = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  priceCents: number;
  quizzes: string[];
};

export type DemoArticle = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
};

export type DemoInstructor = {
  id: number;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
};

export const demoCourses: DemoCourse[] = [
  {
    id: 1,
    slug: "junior-math-foundation",
    title: "國中數學會考基礎班",
    category: "國中會考",
    description: "從觀念、例題到會考題型逐步整理，適合想把數學底子補穩的學生。",
    priceCents: 1280000,
    quizzes: ["一元一次方程式小測", "幾何圖形觀念檢核"],
  },
  {
    id: 2,
    slug: "english-reading-writing",
    title: "英文閱讀與作文養成班",
    category: "英文能力",
    description: "用主題閱讀累積單字與句型，搭配短文寫作練習，培養穩定輸出能力。",
    priceCents: 980000,
    quizzes: ["閱讀理解練習", "常用句型填空"],
  },
  {
    id: 3,
    slug: "senior-physics",
    title: "高中物理觀念精修",
    category: "高中自然",
    description: "把力學、電磁學與實驗題拆成清楚模組，讓解題不再只靠背公式。",
    priceCents: 1680000,
    quizzes: ["牛頓運動定律", "電路基礎題組"],
  },
  {
    id: 4,
    slug: "study-planning",
    title: "讀書計畫與考前衝刺",
    category: "學習策略",
    description: "協助學生安排複習節奏、訂正方法與考前時間配置，提升學習效率。",
    priceCents: 680000,
    quizzes: ["學習習慣自評"],
  },
];

export const demoInstructors: DemoInstructor[] = [
  {
    id: 1,
    name: "林老師",
    title: "數學科主任",
    bio: "擅長把抽象觀念轉成清楚步驟，重視學生的訂正流程與解題表達。",
    avatarUrl: "/images/placeholders/home-instructor.svg",
  },
  {
    id: 2,
    name: "陳老師",
    title: "英文閱讀寫作講師",
    bio: "用生活化主題引導學生累積語感，讓閱讀和作文練習更容易持續。",
    avatarUrl: "/images/placeholders/home-instructor.svg",
  },
  {
    id: 3,
    name: "黃老師",
    title: "自然科講師",
    bio: "重視實驗脈絡與圖表判讀，協助學生用觀念理解題目。",
    avatarUrl: "/images/placeholders/home-instructor.svg",
  },
];

export const demoArticles: DemoArticle[] = [
  {
    id: 1,
    slug: "exam-review-rhythm",
    title: "考前四週如何安排複習節奏",
    excerpt: "把複習分成整理、練題、訂正與模擬四個階段，降低臨時抱佛腳的壓力。",
    content:
      "考前四週最重要的是把每天的任務變小。第一週整理各科弱點，第二週集中練題，第三週把錯題重新分類，第四週用模擬題調整作息與答題速度。比起一次讀很久，穩定且可追蹤的節奏更能幫助學生維持信心。",
    publishedAt: "2026-05-01",
  },
  {
    id: 2,
    slug: "math-correction-notes",
    title: "數學訂正本要怎麼寫才有效",
    excerpt: "訂正不是重抄答案，而是留下自己下次能看懂的錯誤線索。",
    content:
      "有效的訂正本可以分成三欄：原本卡住的地方、正確解法的關鍵、下次遇到類似題目的提醒。學生只要能看出自己是觀念不熟、計算粗心，還是題意誤讀，就能把每次錯題轉成下一次進步的材料。",
    publishedAt: "2026-04-18",
  },
  {
    id: 3,
    slug: "parent-communication",
    title: "家長如何陪孩子建立學習習慣",
    excerpt: "少一點臨時催促，多一點固定回顧，孩子比較容易把學習變成日常。",
    content:
      "陪伴學習不一定是盯著孩子讀書。更有效的方法，是每週固定花十分鐘一起看本週完成了什麼、哪裡卡住、下週要調整什麼。當孩子能說出自己的學習狀態，責任感也會慢慢建立起來。",
    publishedAt: "2026-04-02",
  },
];

export const demoTestimonials = [
  {
    id: 1,
    name: "國三學生家長",
    context: "會考衝刺班",
    courseTitle: "國中數學會考基礎班",
    quote: "老師會追蹤孩子的錯題，不只是上完課就結束，孩子比較知道自己要補哪裡。",
  },
  {
    id: 2,
    name: "高一學生",
    context: "自然科精修",
    courseTitle: "高中物理觀念精修",
    quote: "以前看到題目只會套公式，現在比較知道題目在問什麼，解題比較有方向。",
  },
  {
    id: 3,
    name: "國二學生家長",
    context: "英文閱讀課",
    courseTitle: "英文閱讀與作文養成班",
    quote: "課程份量不會太可怕，但每週都有練習，孩子開始願意主動寫短文。",
  },
];

export const aboutContent = {
  title: "關於宏達補習班",
  paragraphs: [
    "宏達補習班重視穩定、扎實、可追蹤的學習。課程設計從觀念建立開始，搭配題型練習、錯題訂正與階段檢核，讓學生知道自己正在進步什麼。",
    "我們相信補習不是把時間塞滿，而是把學習方法變清楚。老師會依照學生狀態調整練習節奏，協助孩子建立能長期維持的讀書習慣。",
    "這個 GitHub Pages 版本是靜態展示版，提供課程、師資、文章與學員回饋瀏覽。登入、購物車、後台與資料庫功能需部署到支援後端的環境。",
  ],
};

export function findCourse(slug?: string) {
  return demoCourses.find((course) => course.slug === slug) ?? demoCourses[0];
}

export function findArticle(slug?: string) {
  return demoArticles.find((article) => article.slug === slug) ?? demoArticles[0];
}
