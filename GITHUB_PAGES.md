# 使用 GitHub Pages 發布

本專案已將 **index.html** 與所有靜態頁面放在**最外層**（專案根目錄），可直接用 GitHub Pages 從根目錄發布。

## 發布步驟

1. **建立 GitHub 倉庫**  
   若尚未建立，請在 GitHub 建立新倉庫（例如 `Hongda`）。

2. **將本資料夾推送到 GitHub**
   - 在「宏達補習班」資料夾內初始化 Git（若尚未初始化）：
     ```bash
     git init
     git add index.html courses.html course-detail.html cart.html checkout.html checkout-result.html login.html register.html forgot-password.html reset-password.html account.html account-courses.html account-settings.html account-orders.html account-coins.html account-scores.html watch.html quiz.html quiz-result.html news.html article.html about.html instructors.html instructor-detail.html testimonials.html search.html css/ js/ .nojekyll 網站功能架構表.md GITHUB_PAGES.md
     git commit -m "Static site for GitHub Pages"
     git branch -M main
     git remote add origin https://github.com/你的帳號/Hongda.git
     git push -u origin main
     ```
   - 或只加入要發布的檔案，避免把 `web/`、`static/`、`Hongda/` 等一併推上去（可加 `.gitignore` 排除）。

3. **開啟 GitHub Pages**
   - 進入倉庫 → **Settings** → 左側 **Pages**
   - **Source** 選 **Deploy from a branch**
   - **Branch** 選 `main`（或你使用的分支），資料夾選 **/ (root)**
   - 儲存後等待一兩分鐘

4. **網站網址**  
   會是：`https://你的帳號.github.io/Hongda/`  
   （若倉庫名是 `你的帳號.github.io` 則為 `https://你的帳號.github.io/`）

## 根目錄結構（供發布）

```
宏達補習班/
├── index.html          ← 首頁（最外層）
├── courses.html
├── course-detail.html
├── cart.html
├── checkout.html
├── checkout-result.html
├── login.html
├── register.html
├── forgot-password.html
├── reset-password.html
├── account.html
├── account-courses.html
├── account-settings.html
├── account-orders.html
├── account-coins.html
├── account-scores.html
├── watch.html
├── quiz.html
├── quiz-result.html
├── news.html
├── article.html
├── about.html
├── instructors.html
├── instructor-detail.html
├── testimonials.html
├── search.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── .nojekyll          ← 告訴 GitHub 不要用 Jekyll 處理
```

`.nojekyll` 可避免 GitHub Pages 用 Jekyll 處理專案，連結與檔名會維持不變。
