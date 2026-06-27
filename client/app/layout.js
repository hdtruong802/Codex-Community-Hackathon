import "./globals.css";

export const metadata = {
  title: "SửViệtAI — Trò chuyện cùng Nhân vật Lịch sử Việt Nam",
  description: "Trò chuyện trực tiếp với những danh tướng, thi sĩ và nhà tư tưởng lỗi lạc của dân tộc Đại Việt qua mô phỏng trí tuệ nhân tạo.",
  keywords: "Sử Việt AI, lịch sử Việt Nam, Trần Hưng Đạo, Nguyễn Trãi, Hồ Xuân Hương, Nguyễn Du, Lý Thường Kiệt, AI chatbot lịch sử"
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <div className="app-shell">
          <nav className="app-nav">
            <div className="app-nav__inner">
              <div className="app-nav__logo">
                SửViệtAI
              </div>
              <div className="app-nav__badge">
                Codex Hackathon 2026
              </div>
            </div>
          </nav>
          <main className="app-main">
            {children}
          </main>
          <footer className="app-footer">
            <p>SửViệtAI · Codex Community Hackathon 2026 · Track 3: IMPACT to Vietnam</p>
            <p className="app-footer__note">Mô phỏng AI có trách nhiệm, không thay thế sử liệu chính thống.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
