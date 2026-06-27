"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CharacterContext from '@/components/CharacterContext';
import ChatInput from '@/components/ChatInput';
import ChatMessage from '@/components/ChatMessage';
import Disclaimer from '@/components/Disclaimer';
import NotFoundCharacter from '@/components/NotFoundCharacter';
import SuggestedQuestions from '@/components/SuggestedQuestions';
import TypingIndicator from '@/components/TypingIndicator';
import useChat from '@/hooks/useChat';
import { getCharacterDetails } from '@/utils/api';
<<<<<<< HEAD
import { findStaticCharacter } from '@/utils/mockData';

export default function ChatPage({ params }) {
  const router = useRouter();
=======

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

>>>>>>> main
  const messagesEndRef = useRef(null);
  const [characterId, setCharacterId] = useState(null);
  const [character, setCharacter] = useState(null);
  const [loadingCharacter, setLoadingCharacter] = useState(true);

  useEffect(() => {
    Promise.resolve(params).then((resolvedParams) => {
      setCharacterId(resolvedParams?.id || null);
    });
  }, [params]);

  useEffect(() => {
    if (!characterId) return;

    let active = true;

    async function fetchCharacter() {
      setLoadingCharacter(true);
      try {
        const details = await getCharacterDetails(characterId);
<<<<<<< HEAD
        if (active) {
          setCharacter(details || findStaticCharacter(characterId));
=======
        if (details) {
          setCharacter({ ...details, id: characterId });
        } else {
          setCharacter(STATIC_CHARACTERS[characterId] || null);
>>>>>>> main
        }
      } catch (err) {
        console.warn('API error, using static fallback info:', err);
        if (active) {
          setCharacter(findStaticCharacter(characterId));
        }
      } finally {
        if (active) {
          setLoadingCharacter(false);
        }
      }
    }

    fetchCharacter();

    return () => {
      active = false;
    };
  }, [characterId]);

  const {
    messages,
    currentResponse,
    currentSources,
<<<<<<< HEAD
=======
    currentGuardrail,
>>>>>>> main
    isStreaming,
    error,
    lastFailedMessage,
    sendMessage,
    retryLastMessage,
    clearHistory
  } = useChat(characterId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse, isStreaming]);

<<<<<<< HEAD
  if (loadingCharacter || !characterId) {
    return (
      <div className="container state-page">
        <Card className="state-card">
          <div className="state-card__icon pulse" aria-hidden="true">...</div>
          <h2>Đang kết nối thư tịch cổ</h2>
          <p>Ứng dụng đang tải bối cảnh nhân vật. Nếu backend chưa sẵn sàng, dữ liệu mẫu sẽ được dùng để demo không bị gián đoạn.</p>
        </Card>
=======
  // Loading state
  if (!character) {
    return (
      <div className="container loading-screen">
        <div className="loading-text">
          ⏳ Đang kết nối thư tịch cổ...
        </div>
>>>>>>> main
      </div>
    );
  }

<<<<<<< HEAD
  if (!character) {
    return <NotFoundCharacter onBack={() => router.push('/')} />;
  }

  const hasMessages = messages.length > 0;
  const showSuggestions = !hasMessages && !isStreaming;

  return (
    <div className="container chat-page">
      <div className="chat-layout">
        <aside className="chat-sidebar">
          <Button variant="outline" onClick={() => router.push('/')}>
            Về trang chủ
          </Button>
          <CharacterContext character={character} onReset={clearHistory} />
          <Disclaimer />
        </aside>

        <Card className="chat-surface">
          <div className="chat-mobile-header">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/')}
              aria-label="Về trang chủ"
              title="Về trang chủ"
            >
              <ArrowLeft />
            </Button>
            <div className="chat-mobile-header__title">
              <span aria-hidden="true">{character.emoji}</span>
              <div className="chat-mobile-header__text">
                <span className="chat-mobile-header__name">{character.name}</span>
                <span className="chat-mobile-header__period">{character.period}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearHistory}
              aria-label="Xóa hội thoại"
              title="Xóa hội thoại"
            >
              <RotateCcw />
            </Button>
          </div>

          <div className="message-list">
            {!hasMessages && !isStreaming ? (
              <div className="empty-chat">
                <div className="empty-chat__icon" aria-hidden="true">{character.emoji}</div>
                <h3>Đàm đạo cùng {character.name}</h3>
                <p>
                  Đọc bối cảnh nhân vật, chọn một câu hỏi gợi ý hoặc tự đặt câu hỏi để bắt đầu học lịch sử qua đối thoại.
                </p>
              </div>
            ) : (
              messages.map((message, index) => (
                <ChatMessage key={`${message.role}-${index}`} message={message} character={character} />
              ))
            )}

            {isStreaming && currentResponse ? (
              <ChatMessage
                message={{ role: 'assistant', content: currentResponse, sources: currentSources }}
                character={character}
              />
            ) : null}

            {isStreaming && !currentResponse ? (
              <TypingIndicator emoji={character.emoji} />
            ) : null}

            {error ? (
              <Alert variant="destructive" className="chat-error">
                <AlertCircle className="size-4" />
                <AlertTitle>Lỗi kết nối</AlertTitle>
                <AlertDescription>
                  {error} Backend hoặc API key có thể chưa cấu hình. Không có thông tin nhạy cảm nào được hiển thị tại đây.
                </AlertDescription>
                <div className="chat-error__actions">
                  {lastFailedMessage ? (
                    <Button variant="destructive" size="sm" onClick={retryLastMessage} disabled={isStreaming}>
                      Thử lại câu hỏi
                    </Button>
                  ) : null}
                  <Button variant="outline" size="sm" onClick={clearHistory}>
                    Xóa trạng thái lỗi
                  </Button>
                </div>
              </Alert>
            ) : null}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            {showSuggestions ? (
              <SuggestedQuestions
                questions={character.suggestedQuestions}
                onSelect={sendMessage}
                color={character.color}
                disabled={isStreaming}
              />
            ) : null}
            <ChatInput
              onSend={sendMessage}
              placeholder={`Trò chuyện với ${character.name}...`}
              disabled={isStreaming}
            />
          </div>
        </Card>
      </div>
=======
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
>>>>>>> main
    </div>
  );
}
