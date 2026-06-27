"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useChat from '@/hooks/useChat';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';
import SuggestedQuestions from '@/components/SuggestedQuestions';
import Disclaimer from '@/components/Disclaimer';
import { getCharacterDetails } from '@/utils/api';

const STATIC_CHARACTERS = {
  tran_hung_dao: {
    name: 'Trần Hưng Đạo',
    emoji: '⚔️',
    period: 'Thế kỷ XIII · Nhà Trần',
    shortBio: 'Quốc công Tiết chế vĩ đại, người lãnh đạo quân dân Đại Việt 3 lần đánh bại quân xâm lược Nguyên-Mông hùng mạnh bậc nhất thế giới.',
    suggestedQuestions: [
      'Trận nào trong 3 lần đánh quân Nguyên khó khăn nhất?',
      'Ngài viết Hịch tướng sĩ trong hoàn cảnh nào?',
      'Lời khuyên khoan thư sức dân của Ngài có ý nghĩa gì?'
    ],
    color: '#ef4444'
  },
  nguyen_trai: {
    name: 'Nguyễn Trãi',
    emoji: '📝',
    period: 'Thế kỷ XV · Nhà Hậu Lê',
    shortBio: 'Khai quốc công thần nhà Hậu Lê, danh nhân văn hóa thế giới, tác giả của Bình Ngô Đại Cáo. Nhà quân sự thiên tài với tư tưởng lấy "nhân nghĩa" làm gốc.',
    suggestedQuestions: [
      'Mưu phạt tâm công nghĩa là đánh vào lòng người như thế nào?',
      'Hoàn cảnh ra đời của bài Bình Ngô Đại Cáo?',
      'Nỗi lòng của Ngài gửi gắm qua Quốc âm thi tập?'
    ],
    color: '#3b82f6'
  },
  ho_xuan_huong: {
    name: 'Hồ Xuân Hương',
    emoji: '🌸',
    period: 'Thế kỷ XVIII-XIX · Lê Trung Hưng - Nguyễn',
    shortBio: 'Nữ thi sĩ kiệt xuất được mệnh danh là "Bà chúa thơ Nôm". Thơ của bà mang phong cách trào phúng châm biếm sâu cay, bênh vực người phụ nữ.',
    suggestedQuestions: [
      'Ý nghĩa ẩn dụ trong bài thơ Bánh trôi nước là gì?',
      'Nỗi lòng riêng tư của bà gửi gắm trong thơ Tự tình?',
      'Làm thế nào bà vượt qua được định kiến xã hội thời bấy giờ?'
    ],
    color: '#ec4899'
  },
  nguyen_du: {
    name: 'Nguyễn Du',
    emoji: '📜',
    period: 'Thế kỷ XVIII-XIX · Nhà Nguyễn',
    shortBio: 'Đại thi hào dân tộc, danh nhân văn hóa thế giới, tác giả kiệt tác Truyện Kiều. Thơ của ông chan chứa tinh thần nhân đạo và lòng trắc ẩn.',
    suggestedQuestions: [
      'Cảm hứng nào giúp cụ viết nên kiệt tác Truyện Kiều?',
      'Ý nghĩa hai chữ "bể dâu" cụ thường nhắc tới là gì?',
      'Tấm lòng cụ dành cho kiếp người bất hạnh qua Văn tế thập loại chúng sinh?'
    ],
    color: '#f59e0b'
  },
  ly_thuong_kiet: {
    name: 'Lý Thường Kiệt',
    emoji: '🏛️',
    period: 'Thế kỷ XI · Nhà Lý',
    shortBio: 'Thái úy danh tướng nhà Lý, người đánh bại đại quân nhà Tống xâm lược. Ông gắn liền với bài thơ Nam quốc sơn hà - tuyên ngôn độc lập đầu tiên.',
    suggestedQuestions: [
      'Sự thật về bài thơ thần Nam quốc sơn hà vang lên bên sông Như Nguyệt?',
      'Tại sao Ngài áp dụng chiến thuật tiên phát chế nhân đánh sang đất Tống?',
      'Ngài xây dựng chiến tuyến sông Cầu phòng thủ ra sao?'
    ],
    color: '#10b981'
  }
};

export default function ChatPage({ params }) {
  const router = useRouter();
  const [unwrappedParams, setUnwrappedParams] = useState(null);
  const [character, setCharacter] = useState(null);
  
  const messagesEndRef = useRef(null);

  // Safely resolve the dynamic params promise (Next.js 14 & 15 cross-compatible)
  useEffect(() => {
    Promise.resolve(params).then((res) => {
      setUnwrappedParams(res);
    });
  }, [params]);

  const characterId = unwrappedParams?.id;

  // Retrieve character details
  useEffect(() => {
    if (!characterId) return;
    async function fetchCharacter() {
      try {
        const details = await getCharacterDetails(characterId);
        if (details) {
          setCharacter(details);
        } else {
          // Fallback if API returned null
          setCharacter(STATIC_CHARACTERS[characterId] || null);
        }
      } catch (err) {
        console.warn('API error, using static fallback info:', err);
        setCharacter(STATIC_CHARACTERS[characterId] || null);
      }
    }
    fetchCharacter();
  }, [characterId]);

  // Hook handles Express chat integration
  const {
    messages,
    currentResponse,
    isStreaming,
    error,
    sendMessage,
    clearHistory
  } = useChat(characterId);

  // Auto-scroll chat area to bottom when new words stream
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse, isStreaming]);

  if (!character) {
    return (
      <div className="container" style={styles.loadingContainer}>
        <div className="pulse" style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
          Đang kết nối thư tịch cổ...
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={styles.chatLayout}>
      {/* SIDEBAR - CHARACTER PROFILE INFO */}
      <aside style={styles.sidebar}>
        <button onClick={() => router.push('/')} style={styles.backBtn}>
          ← Về trang chủ
        </button>
        <div style={{ ...styles.profileBox, borderColor: `${character.color}25` }}>
          <div style={styles.profileEmoji}>{character.emoji}</div>
          <h2 style={styles.profileName}>{character.name}</h2>
          <span style={{ ...styles.profilePeriod, color: character.color }}>{character.period}</span>
          <p style={styles.profileBio}>{character.shortBio}</p>
          <div style={styles.divider} />
          <button onClick={clearHistory} style={styles.resetBtn}>
            🗑️ Xóa hội thoại
          </button>
        </div>
        <Disclaimer />
      </aside>

      {/* CHAT AREA */}
      <section style={styles.chatArea}>
        {/* HEADER BAR FOR MOBILE */}
        <div style={styles.chatHeaderMobile}>
          <button onClick={() => router.push('/')} style={styles.backBtnMobile}>
            ←
          </button>
          <div style={styles.headerTitleMobile}>
            <span style={{ marginRight: '0.4rem' }}>{character.emoji}</span>
            <strong>{character.name}</strong>
          </div>
          <button onClick={clearHistory} style={styles.resetBtnMobile} title="Xóa hội thoại">
            🗑️
          </button>
        </div>

        {/* MESSAGES LIST CONTAINER */}
        <div style={styles.messageBox}>
          {messages.length === 0 && !isStreaming ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📜</div>
              <h3 style={{ marginBottom: '0.5rem' }}>Đàm đạo cùng {character.name}</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', fontSize: '0.82rem' }}>
                Hãy bắt đầu bằng cách gõ câu hỏi hoặc chọn một trong các gợi ý bên dưới để tìm hiểu về cuộc đời của Ngài.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} character={character} />
            ))
          )}

          {/* Render Streaming Chunk in progress */}
          {isStreaming && currentResponse && (
            <ChatMessage
              message={{ role: 'assistant', content: currentResponse }}
              character={character}
            />
          )}

          {/* Render typing indicator if request sent but no data received yet */}
          {isStreaming && !currentResponse && (
            <TypingIndicator emoji={character.emoji} />
          )}

          {error && (
            <div style={styles.errorBox}>
              <strong>Lỗi kết nối:</strong> {error}. Hãy chắc chắn rằng backend server đang hoạt động tại cổng 3001 và API Key hợp lệ.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* CHAT INTERACTION (SUGGESTED QUESTIONS + INPUT) */}
        <div style={styles.inputArea}>
          {messages.length === 0 && !isStreaming && (
            <SuggestedQuestions
              questions={character.suggestedQuestions}
              onSelect={sendMessage}
              color={character.color}
            />
          )}
          <ChatInput
            onSend={sendMessage}
            placeholder={`Trò chuyện với ${character.name}...`}
            disabled={isStreaming}
          />
        </div>
      </section>
    </div>
  );
}

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh'
  },
  chatLayout: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: '1.5rem',
    height: 'calc(100vh - 150px)',
    paddingBottom: '1.5rem'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: '100%',
    overflowY: 'auto'
  },
  backBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    padding: '0.6rem 1rem',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '600',
    textAlign: 'left',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content'
  },
  profileBox: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    padding: '1.5rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  profileEmoji: {
    fontSize: '3.5rem',
    marginBottom: '0.75rem'
  },
  profileName: {
    fontSize: '1.3rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '0.25rem'
  },
  profilePeriod: {
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1rem'
  },
  profileBio: {
    fontSize: '0.82rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    textAlign: 'justify'
  },
  divider: {
    width: '100%',
    height: '1px',
    background: 'var(--border)',
    margin: '1.25rem 0'
  },
  resetBtn: {
    width: '100%',
    background: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: 'var(--accent-red)',
    padding: '0.6rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.82rem',
    fontWeight: '600',
    transition: 'all 0.2s'
  },
  chatArea: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden'
  },
  chatHeaderMobile: {
    display: 'none',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid var(--border)',
    background: 'rgba(14, 14, 22, 0.5)'
  },
  backBtnMobile: {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: '1.2rem',
    cursor: 'pointer'
  },
  headerTitleMobile: {
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center'
  },
  resetBtnMobile: {
    background: 'transparent',
    border: 'none',
    color: 'var(--accent-red)',
    fontSize: '1rem',
    cursor: 'pointer'
  },
  messageBox: {
    flex: 1,
    padding: '1.5rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    color: 'var(--text-muted)',
    padding: '2rem'
  },
  emptyIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  errorBox: {
    padding: '0.8rem 1rem',
    background: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    color: 'var(--accent-red)',
    borderRadius: '8px',
    fontSize: '0.8rem',
    marginTop: '0.5rem',
    lineHeight: '1.4'
  },
  inputArea: {
    padding: '1rem 1.5rem 1.5rem',
    borderTop: '1px solid var(--border)',
    background: 'rgba(10, 10, 15, 0.2)'
  },

  // Media queries responsive styles injected programmatically
  '@media (max-width: 768px)': {
    chatLayout: {
      gridTemplateColumns: '1fr',
      height: 'calc(100vh - 100px)'
    },
    sidebar: {
      display: 'none'
    },
    chatHeaderMobile: {
      display: 'flex'
    }
  }
};

// Simple media query adapter inject
if (typeof window !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    @media (max-width: 768px) {
      .client_chatLayout__1122 {
        grid-template-columns: 1fr !important;
        height: calc(100vh - 120px) !important;
      }
      aside {
        display: none !important;
      }
      .mobile-header-active {
        display: flex !important;
      }
    }
  `;
  document.head.appendChild(styleEl);
}
