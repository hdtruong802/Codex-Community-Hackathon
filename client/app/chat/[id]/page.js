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

const PORTRAITS = {
  tran_hung_dao: '/characters/tran_hung_dao.png',
  ly_thuong_kiet: '/characters/ly_thuong_kiet.png',
  ho_xuan_huong: '/characters/ho_xuan_huong.png'
};

const STATIC_CHARACTERS = {
  tran_hung_dao: {
    id: 'tran_hung_dao',
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
  ly_thuong_kiet: {
    id: 'ly_thuong_kiet',
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
  },
  ho_xuan_huong: {
    id: 'ho_xuan_huong',
    name: 'Hồ Xuân Hương',
    emoji: '🌸',
    period: 'Thế kỷ XVIII-XIX · Lê Trung Hưng - Nguyễn',
    shortBio: 'Nữ sĩ tài hoa được mệnh danh là "Bà chúa thơ Nôm", nổi bật với thơ Nôm trào phúng, sắc sảo, bênh vực thân phận và khát vọng sống của người phụ nữ.',
    suggestedQuestions: [
      'Ý nghĩa ẩn dụ trong bài thơ Bánh trôi nước là gì?',
      'Nỗi lòng riêng tư của bà gửi gắm trong thơ Tự tình?',
      'Vì sao thơ Hồ Xuân Hương vừa trào phúng vừa nhân văn?'
    ],
    color: '#ec4899'
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
          setCharacter({ ...details, id: characterId });
        } else {
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
    currentSources,
    currentGuardrail,
    isStreaming,
    error,
    sendMessage,
    clearHistory
  } = useChat(characterId);

  // Auto-scroll chat area to bottom when new words stream
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse, isStreaming]);

  // Loading state
  if (!character) {
    return (
      <div className="container loading-screen">
        <div className="loading-text">
          ⏳ Đang kết nối thư tịch cổ...
        </div>
      </div>
    );
  }

  const portrait = PORTRAITS[characterId];
  const color = character.color || '#8b5cf6';

  return (
    <div className="container chat-layout">
      {/* ═══ SIDEBAR ═══ */}
      <aside className="chat-sidebar">
        <button onClick={() => router.push('/')} className="chat-back-btn">
          ← Về trang chủ
        </button>

        <div className="profile-card">
          {/* Portrait */}
          <div className="profile-portrait">
            {portrait ? (
              <img src={portrait} alt={character.name} />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                background: `linear-gradient(135deg, ${color}15, ${color}08)`
              }}>
                {character.emoji}
              </div>
            )}
            <div className="profile-portrait-overlay" />
            <div className="card-ai-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Ảnh phục dựng bằng AI
            </div>
          </div>

          {/* Info */}
          <div className="profile-info">
            <span className="profile-emoji">{character.emoji}</span>
            <h2 className="profile-name">{character.name}</h2>
            <div className="profile-period" style={{ color }}>{character.period}</div>
            <p className="profile-bio">{character.shortBio}</p>
            <div className="profile-divider" />
          </div>

          {/* Clear button */}
          <button onClick={clearHistory} className="chat-clear-btn">
            🗑️ Xóa hội thoại
          </button>
        </div>

        <Disclaimer />
      </aside>

      {/* ═══ CHAT AREA ═══ */}
      <section
        className="chat-area"
        style={{
          '--chat-color': color
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '200px',
            background: `radial-gradient(ellipse at 50% 0%, ${color}08, transparent 70%)`,
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Mobile header */}
        <div className="chat-header-mobile">
          <button onClick={() => router.push('/')} className="chat-header-mobile-back">
            ←
          </button>
          <div className="chat-header-mobile-title">
            <span>{character.emoji}</span>
            <strong>{character.name}</strong>
          </div>
          <button onClick={clearHistory} className="chat-header-mobile-clear" title="Xóa hội thoại">
            🗑️
          </button>
        </div>

        {/* Messages */}
        <div className="messages-container">
          {messages.length === 0 && !isStreaming ? (
            <div className="empty-state">
              <div className="empty-state-icon">📜</div>
              <h3 className="empty-state-title">Đàm đạo cùng {character.name}</h3>
              <p className="empty-state-desc">
                Hãy bắt đầu bằng cách gõ câu hỏi hoặc chọn một trong các gợi ý bên dưới
                để tìm hiểu về cuộc đời và di sản của nhân vật.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} character={character} />
            ))
          )}

          {/* Streaming response in progress */}
          {isStreaming && currentResponse && (
            <ChatMessage
              message={{
                role: 'assistant',
                content: currentResponse,
                sources: currentSources,
                guardrail: currentGuardrail
              }}
              character={character}
            />
          )}

          {/* Typing indicator */}
          {isStreaming && !currentResponse && (
            <TypingIndicator emoji={character.emoji} characterId={characterId} />
          )}

          {/* Error */}
          {error && (
            <div className="error-box">
              <strong>Lỗi kết nối:</strong> {error}. Hãy chắc chắn rằng backend server đang hoạt động tại cổng 3001 và API Key hợp lệ.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="input-area">
          {messages.length === 0 && !isStreaming && (
            <SuggestedQuestions
              questions={character.suggestedQuestions}
              onSelect={sendMessage}
              color={color}
            />
          )}
          <ChatInput
            onSend={sendMessage}
            placeholder={`Trò chuyện với ${character.name}...`}
            disabled={isStreaming}
            characterColor={color}
          />
        </div>
      </section>
    </div>
  );
}
