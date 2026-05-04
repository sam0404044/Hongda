<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project uses a very new Next.js version. APIs, conventions, and file
structure may differ from older training data. When unsure, inspect local
installed docs or package files before changing code.
<!-- END:nextjs-agent-rules -->

# Hongda Project Handoff Notes

這份檔案給 AI agent 和換電腦開發時使用。目標是讓另一台電腦即使沒有裝好軟體，也能照步驟把專案跑起來。

## Current Tech Stack

- Framework: Next.js 16.2.4, App Router
- UI: React 19.2.4, TypeScript, Tailwind CSS 4
- Backend: Next.js Route Handlers under `src/app/api`
- Database: MySQL 8.4
- ORM: Prisma 7.8, custom generated client output at `src/generated/prisma`
- Prisma driver adapter: `@prisma/adapter-mariadb` with `mariadb`
- Auth: bcrypt password hash, signed httpOnly cookie session
- Package manager: npm with `package-lock.json`

## Required Software On A New Computer

Install these before running the project:

- Git
- Node.js LTS 24.x or compatible current LTS
- npm, installed with Node.js
- MySQL Server 8.4 or compatible MySQL 8
- MySQL Workbench, optional but helpful
- VS Code, optional

Useful Windows checks:

```powershell
git --version
node -v
npm -v
mysql --version
```

If commands are not found on Windows, add these to PATH or use full paths:

```text
C:\Program Files\Git\cmd
C:\Program Files\nodejs
C:\Program Files\MySQL\MySQL Server 8.4\bin
```

## Clone And Install

```powershell
git clone https://github.com/sam0404044/Hongda.git
cd Hongda
npm install
```

Do not commit `node_modules`, `.next`, or `.env`.

## Environment Variables

Create `.env` in the project root. This file is ignored by git.

Local development example:

```env
DATABASE_URL="mysql://root@localhost:3306/hongda_db"
SESSION_SECRET="change-this-local-secret"
```

Notes:

- `DATABASE_URL` must point to the local or remote MySQL database.
- `SESSION_SECRET` is used to sign login cookies. If missing, the app uses a local fallback, but every real machine should set its own value.
- If MySQL root has a password, use:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/hongda_db"
```

## MySQL Setup

Create the database:

```sql
CREATE DATABASE hongda_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Windows command example:

```powershell
mysql -u root -e "CREATE DATABASE IF NOT EXISTS hongda_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

If MySQL is not running as a Windows service, start it from Services, MySQL Workbench, or run the configured MySQL service.

## Prisma Setup

After `.env` and MySQL are ready:

```powershell
npx prisma generate
npx prisma migrate dev
```

Current database schema:

- `users`

Current Prisma model:

- `User`

Important Prisma 7 note:

- `generator client` outputs to `src/generated/prisma`
- That generated folder is ignored by git
- Always run `npx prisma generate` after install or schema changes
- Runtime Prisma client is created in `src/lib/prisma.ts`
- MySQL uses `PrismaMariaDb` from `@prisma/adapter-mariadb`

## Run The App

```powershell
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

Production checks:

```powershell
npm run lint
npm run build
```

## Current Implemented Features

Static/converted pages:

- Old HTML pages were converted into `src/lib/static-pages.ts`
- Catch-all renderer is `src/app/[[...slug]]/page.tsx`
- Shared shell is now handled by React components:
  - `src/components/NavBar.tsx`
  - `src/components/Footer.tsx`

Branding:

- Logo files are in `public/brand`
- Favicon uses `public/brand/hongda-logo-vertical-color.png`
- NavBar logo uses `public/brand/hongda-logo-horizontal-color.png`

Auth APIs:

- `POST /api/auth/register`
- `GET /api/auth/check-email?email=...`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

Auth pages:

- `/register` is a real React form
- `/login` is a real React form

User table fields:

- `id`
- `name`
- `email`
- `password_hash`
- `birthday`
- `phone`
- `gender`
- `role`
- `created_at`
- `updated_at`

Gender values currently used:

- `M`
- `F`
- `OTHER`

## Known Notes

- Login redirects to `/account`, but account pages are still converted static content and are not yet protected by session.
- Google quick login button is visual only; OAuth is not implemented yet.
- Old HTML backup exists outside the repo on the original computer: `Hongda-html-backup-20260501-150314`.
- Some older converted static page strings may still contain legacy content. New interactive pages should be implemented as real React pages under `src/app`.

## Recommended Next Steps

1. Protect `/account` routes using the session from `/api/auth/me`.
2. Update NavBar to show logged-in user and logout button.
3. Add Course, Order, Article, Quiz models to Prisma.
4. Replace converted static course/account pages with real database-backed React pages.
5. Add seed data for local setup.

