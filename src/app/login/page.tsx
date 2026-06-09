import { StaticModeNotice } from "@/components/StaticModeNotice";

export default function LoginPage() {
  return (
    <StaticModeNotice
      title="登入功能未在靜態展示版啟用"
      description="GitHub Pages 無法執行登入 session、API routes 或資料庫連線。若要使用登入、會員中心與後台，請部署到 Vercel、Netlify Functions 或其他支援後端的主機。"
    />
  );
}
