import "./globals.css";

export const metadata = {
  title: "SửViệtAI — Trò chuyện cùng Nhân vật Lịch sử Việt Nam",
  description: "Trò chuyện trực tiếp với những danh tướng, thi sĩ và nhà tư tưởng lỗi lạc của dân tộc Đại Việt qua mô phỏng trí tuệ nhân tạo.",
  keywords: "Sử Việt AI, lịch sử Việt Nam, Trần Hưng Đạo, Lý Thường Kiệt, Hồ Xuân Hương, AI chatbot lịch sử"
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        {/* NAVBAR */}
        <nav className="navbar">
          <div className="nav-inner">
            <a href="/" className="nav-logo">
              <span className="nav-logo-icon">⚔️</span>
              <span className="nav-logo-text">SửViệtAI</span>
            </a>
            <div className="nav-badge">
              Codex Hackathon 2026
            </div>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main className="main-content">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <p>⚔️ SửViệtAI — Codex Community Hackathon 2026 · Track 3: IMPACT to Vietnam</p>
          <p className="footer-heart">Prepared with 💜 — Chúc team chiến thắng! 🇻🇳</p>
        </footer>
      </body>
    </html>
  );
}
