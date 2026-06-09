import { hash } from "bcryptjs";
import { createScriptPrismaClient } from "../src/lib/script-prisma";

const prisma = createScriptPrismaClient();

async function main() {
  const adminPasswordHash = await hash("hongda123", 12);
  const memberPasswordHash = await hash("Password123!", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@hongda.tw" },
    update: {
      name: "宏達管理員",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
    create: {
      name: "宏達管理員",
      email: "admin@hongda.tw",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  const member = await prisma.user.upsert({
    where: { email: "demo@hongda.tw" },
    update: {
      name: "示範會員",
      passwordHash: memberPasswordHash,
      role: "USER",
      phone: "0912345678",
      gender: "OTHER",
    },
    create: {
      name: "示範會員",
      email: "demo@hongda.tw",
      passwordHash: memberPasswordHash,
      role: "USER",
      phone: "0912345678",
      gender: "OTHER",
    },
  });

  await prisma.sitePage.upsert({
    where: { slug: "about" },
    update: {
      title: "關於我們",
      content:
        "宏達創立於民國六十四年，以「凡含淚播種者，必有歡笑的收穫」為班訓；以「誠懇、踏實、負責」為辦學態度。\n\n長期深耕大台南地區，以扎實教學與升學輔導陪伴學生面對各階段考試。\n\n地址：台南市中西區中正路88號7樓\n電話：(06) 2201833",
    },
    create: {
      slug: "about",
      title: "關於我們",
      content:
        "宏達創立於民國六十四年，以「凡含淚播種者，必有歡笑的收穫」為班訓；以「誠懇、踏實、負責」為辦學態度。\n\n長期深耕大台南地區，以扎實教學與升學輔導陪伴學生面對各階段考試。\n\n地址：台南市中西區中正路88號7樓\n電話：(06) 2201833",
    },
  });

  const gsatCourse = await prisma.course.upsert({
    where: { slug: "gsat-foundation" },
    update: {
      title: "學測全科基礎班",
      description: "整合國英數自社核心觀念，協助學生建立穩定讀書節奏。",
      category: "高中升學",
      priceCents: 1280000,
    },
    create: {
      slug: "gsat-foundation",
      title: "學測全科基礎班",
      description: "整合國英數自社核心觀念，協助學生建立穩定讀書節奏。",
      category: "高中升學",
      priceCents: 1280000,
      coverUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop",
    },
  });

  const juniorCourse = await prisma.course.upsert({
    where: { slug: "junior-math" },
    update: {
      title: "國中數學精修班",
      description: "從觀念、題型到段考複習，建立可延續的解題能力。",
      category: "國中課程",
      priceCents: 680000,
    },
    create: {
      slug: "junior-math",
      title: "國中數學精修班",
      description: "從觀念、題型到段考複習，建立可延續的解題能力。",
      category: "國中課程",
      priceCents: 680000,
      coverUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop",
    },
  });

  const quiz = await prisma.quiz.upsert({
    where: { slug: "gsat-foundation-check" },
    update: {
      title: "學測基礎概念檢核",
      courseId: gsatCourse.id,
    },
    create: {
      slug: "gsat-foundation-check",
      title: "學測基礎概念檢核",
      courseId: gsatCourse.id,
      questions: [
        {
          prompt: "下列哪一項最適合作為複習計畫的第一步？",
          options: ["先盤點弱點", "只做難題", "跳過錯題", "只看詳解"],
          answer: 0,
        },
      ],
    },
  });

  const featuredArticle = await prisma.article.upsert({
    where: { slug: "study-plan-guide" },
    update: {
      title: "如何安排穩定的升學讀書計畫",
      excerpt: "從目標、時間與回饋三個面向，建立能持續執行的讀書節奏。",
      content: "穩定的讀書計畫需要清楚目標、固定複習節奏，以及能回頭檢查成果的紀錄方式。",
      isPublished: true,
    },
    create: {
      slug: "study-plan-guide",
      title: "如何安排穩定的升學讀書計畫",
      excerpt: "從目標、時間與回饋三個面向，建立能持續執行的讀書節奏。",
      content: "穩定的讀書計畫需要清楚目標、固定複習節奏，以及能回頭檢查成果的紀錄方式。",
      publishedAt: new Date(),
    },
  });

  await prisma.testimonial.deleteMany({
    where: { name: { in: ["王同學", "陳同學", "林同學"] } },
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: "王同學",
        context: "學測班",
        quote: "宏達老師帶得很扎實，講義與進度安排清楚，最後如願考上理想校系。",
        courseTitle: "學測全科基礎班",
        sortOrder: 1,
      },
      {
        name: "陳同學",
        context: "國中課程",
        quote: "從國中到高中都有穩定陪伴，讓我能一步一步把基礎補起來。",
        courseTitle: "國中數學精修班",
        sortOrder: 2,
      },
      {
        name: "林同學",
        context: "升學輔導",
        quote: "老師願意反覆確認觀念，準備考試時比較踏實，也比較知道自己要補哪裡。",
        courseTitle: "學測全科基礎班",
        sortOrder: 3,
      },
    ],
  });

  await prisma.order.upsert({
    where: { orderNo: "HD-DEMO-0001" },
    update: {},
    create: {
      orderNo: "HD-DEMO-0001",
      userId: member.id,
      status: "PAID",
      totalCents: gsatCourse.priceCents,
      paidAt: new Date(),
      items: {
        create: {
          courseId: gsatCourse.id,
          quantity: 1,
          priceCents: gsatCourse.priceCents,
        },
      },
    },
  });

  await prisma.cartItem.upsert({
    where: {
      userId_courseId: {
        userId: member.id,
        courseId: juniorCourse.id,
      },
    },
    update: { quantity: 1 },
    create: {
      userId: member.id,
      courseId: juniorCourse.id,
      quantity: 1,
    },
  });

  const mathInstructor = await prisma.instructor.upsert({
    where: { slug: "math-chen" },
    update: {
      name: "陳老師",
      title: "數學科主任",
      bio: "擅長把抽象觀念拆成可練習的步驟，協助學生穩定掌握解題節奏。",
      avatarUrl: "/images/placeholders/home-instructor.svg",
      specialties: ["國中數學", "高中數學", "解題策略"],
      isPublished: true,
      sortOrder: 1,
    },
    create: {
      slug: "math-chen",
      name: "陳老師",
      title: "數學科主任",
      bio: "擅長把抽象觀念拆成可練習的步驟，協助學生穩定掌握解題節奏。",
      avatarUrl: "/images/placeholders/home-instructor.svg",
      specialties: ["國中數學", "高中數學", "解題策略"],
      isPublished: true,
      sortOrder: 1,
    },
  });

  const englishInstructor = await prisma.instructor.upsert({
    where: { slug: "english-lin" },
    update: {
      name: "林老師",
      title: "英文閱讀與作文講師",
      bio: "重視字彙、文法與閱讀策略的整合，讓學生能把練習成果帶進段考與大考。",
      avatarUrl: "/images/placeholders/home-instructor.svg",
      specialties: ["英文閱讀", "作文架構", "升學英文"],
      isPublished: true,
      sortOrder: 2,
    },
    create: {
      slug: "english-lin",
      name: "林老師",
      title: "英文閱讀與作文講師",
      bio: "重視字彙、文法與閱讀策略的整合，讓學生能把練習成果帶進段考與大考。",
      avatarUrl: "/images/placeholders/home-instructor.svg",
      specialties: ["英文閱讀", "作文架構", "升學英文"],
      isPublished: true,
      sortOrder: 2,
    },
  });

  const scienceInstructor = await prisma.instructor.upsert({
    where: { slug: "science-wang" },
    update: {
      name: "王老師",
      title: "自然科講師",
      bio: "用實驗情境與圖像化整理建立自然科觀念，幫助學生降低背誦負擔。",
      avatarUrl: "/images/placeholders/home-instructor.svg",
      specialties: ["自然科", "理化", "觀念統整"],
      isPublished: true,
      sortOrder: 3,
    },
    create: {
      slug: "science-wang",
      name: "王老師",
      title: "自然科講師",
      bio: "用實驗情境與圖像化整理建立自然科觀念，幫助學生降低背誦負擔。",
      avatarUrl: "/images/placeholders/home-instructor.svg",
      specialties: ["自然科", "理化", "觀念統整"],
      isPublished: true,
      sortOrder: 3,
    },
  });

  await prisma.homepageSlot.deleteMany({
    where: {
      section: {
        in: ["featured_courses", "featured_instructors", "featured_articles"],
      },
    },
  });

  await prisma.homepageSlot.createMany({
    data: [
      {
        section: "featured_courses",
        itemType: "COURSE",
        courseId: gsatCourse.id,
        sortOrder: 1,
      },
      {
        section: "featured_courses",
        itemType: "COURSE",
        courseId: juniorCourse.id,
        sortOrder: 2,
      },
      {
        section: "featured_instructors",
        itemType: "INSTRUCTOR",
        instructorId: mathInstructor.id,
        sortOrder: 1,
      },
      {
        section: "featured_instructors",
        itemType: "INSTRUCTOR",
        instructorId: englishInstructor.id,
        sortOrder: 2,
      },
      {
        section: "featured_instructors",
        itemType: "INSTRUCTOR",
        instructorId: scienceInstructor.id,
        sortOrder: 3,
      },
      {
        section: "featured_articles",
        itemType: "ARTICLE",
        articleId: featuredArticle.id,
        sortOrder: 1,
      },
    ],
  });

  const existingAttempt = await prisma.quizAttempt.findFirst({
    where: {
      userId: member.id,
      quizId: quiz.id,
    },
  });

  if (!existingAttempt) {
    await prisma.quizAttempt.create({
      data: {
        userId: member.id,
        quizId: quiz.id,
        score: 80,
        maxScore: 100,
      },
    });
  }

  console.log(`Seed completed. Admin: ${admin.email} / hongda123`);
  console.log(`Demo member: ${member.email} / Password123!`);
  console.log(`Courses ready: ${gsatCourse.slug}, ${juniorCourse.slug}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
