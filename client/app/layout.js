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
          <p style={styles.footerNote}>Prepared with 💜 — Chúc team chiến thắng!</p>
        </footer>
      </body>
    </html>
  );
}

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'rgba(10, 10, 15, 0.85)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)',
    zIndex: 1000,
    height: '60px',
    display: 'flex',
    alignItems: 'center'
  },
  navInner: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navLogo: {
    fontWeight: '800',
    fontSize: '1rem',
    background: 'var(--gradient-main)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.01em'
  },
  navBadge: {
    fontSize: '0.7rem',
    fontWeight: '600',
    padding: '0.25rem 0.6rem',
    borderRadius: '100px',
    background: 'rgba(139, 92, 246, 0.1)',
    border: '1px solid rgba(139, 92, 246, 0.25)',
    color: 'var(--accent-purple)'
  },
  mainContainer: {
    paddingTop: '80px',
    minHeight: 'calc(100vh - 140px)',
    position: 'relative',
    zIndex: 1
  },
  footer: {
    textAlign: 'center',
    padding: '2rem 0',
    borderTop: '1px solid var(--border)',
    color: 'var(--text-muted)',
    fontSize: '0.78rem',
    background: 'rgba(10, 10, 15, 0.5)',
    position: 'relative',
    zIndex: 1
  },
  footerNote: {
    marginTop: '0.35rem',
    color: 'var(--accent-purple)'
  }
};
