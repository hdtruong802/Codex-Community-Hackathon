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
import { findStaticCharacter } from '@/utils/mockData';

export default function ChatPage({ params }) {
  const router = useRouter();
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
        if (active) {
          setCharacter(details || findStaticCharacter(characterId));
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

  if (loadingCharacter || !characterId) {
    return (
      <div className="container state-page">
        <Card className="state-card">
          <div className="state-card__icon pulse" aria-hidden="true">...</div>
          <h2>Đang kết nối thư tịch cổ</h2>
          <p>Ứng dụng đang tải bối cảnh nhân vật. Nếu backend chưa sẵn sàng, dữ liệu mẫu sẽ được dùng để demo không bị gián đoạn.</p>
        </Card>
      </div>
    );
  }

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
    </div>
  );
}
