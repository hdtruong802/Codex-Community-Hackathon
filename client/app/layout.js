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
        <nav style={styles.nav}>
          <div style={styles.navInner}>
            <div style={styles.navLogo}>
              ⚔️ SửViệtAI — Hào Khí Đông A
            </div>
            <div style={styles.navBadge}>
              Codex Hackathon 2026
            </div>
          </div>
        </nav>
        <main style={styles.mainContainer}>
          {children}
        </main>
        <footer style={styles.footer}>
          <p>⚔️ SửViệtAI — Codex Community Hackathon 2026 · Track 3: IMPACT to Vietnam</p>
          {/* <p className="footer-heart">Prepared with 💜 — Chúc team chiến thắng! 🇻🇳</p> */}
        </footer>
      </body>
    </html>
  );
}
