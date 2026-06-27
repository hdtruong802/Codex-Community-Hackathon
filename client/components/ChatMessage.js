import React from 'react';
import { API_BASE_URL } from '@/utils/api';

const SOURCE_MARKER = '📚';

const PORTRAITS = {
  tran_hung_dao: '/characters/tran_hung_dao.png',
  ly_thuong_kiet: '/characters/ly_thuong_kiet.png',
  ho_xuan_huong: '/characters/ho_xuan_huong.png'
};

const buildDocumentUrl = (source) => {
  if (!source?.sourceFile) return null;
  const pageAnchor = source.pageStart ? `#page=${source.pageStart}` : '';
  return `${API_BASE_URL}/api/sources/document?path=${encodeURIComponent(source.sourceFile)}${pageAnchor}`;
};

const parseContent = (text) => {
  if (!text) return { content: '', fallbackSource: null };
  if (!text.includes(SOURCE_MARKER)) return { content: text, fallbackSource: null };

  const [content, ...sourceParts] = text.split(SOURCE_MARKER);
  return {
    content: content.trim(),
    fallbackSource: `${SOURCE_MARKER} ${sourceParts.join(SOURCE_MARKER).trim()}`
  };
};

export default function ChatMessage({ message, character }) {
  const isUser = message.role === 'user';
  const { content, fallbackSource } = parseContent(message.content);
  const sources = Array.isArray(message.sources) ? message.sources : [];
  const guardrail = message.guardrail;
  const color = character?.color || '#8b5cf6';
  const portrait = character?.id ? PORTRAITS[character.id] : null;

  const guardrailLabel = guardrail?.decision === 'block'
    ? 'Đã chặn theo guardrail'
    : 'Đã chuyển hướng về lịch sử';

  return (
    <div className={`message ${isUser ? 'message-user' : 'message-ai'}`}>
      <div className="message-wrapper">
        {/* AI Avatar */}
        {!isUser && (
          <div
            className="message-avatar message-avatar-ai"
            style={{ background: `${color}10`, borderColor: `${color}20` }}
          >
            {portrait ? (
              <img src={portrait} alt={character?.name || ''} />
            ) : (
              character?.emoji || '👤'
            )}
          </div>
        )}

        {/* Message Bubble */}
        <div className={`message-bubble ${isUser ? 'message-bubble-user' : 'message-bubble-ai'}`}>
          {/* Guardrail badge */}
          {!isUser && guardrail && guardrail.decision !== 'allow' && (
            <div
              className="guardrail-badge"
              style={{
                border: `1px solid ${guardrail.decision === 'block' ? 'rgba(239, 68, 68, 0.25)' : `${color}35`}`,
                background: guardrail.decision === 'block' ? 'rgba(239, 68, 68, 0.06)' : `${color}10`,
                color: guardrail.decision === 'block' ? 'var(--accent-red)' : color
              }}
            >
              {guardrailLabel}
            </div>
          )}

          {/* Content */}
          <div className="message-content">{content}</div>

          {/* Structured sources from RAG */}
          {!isUser && sources.length > 0 && (
            <div className="source-box" style={{ color }}>
              <div className="source-header">
                📖 Sử liệu tham khảo
              </div>
              {sources.map((source, index) => {
                const documentUrl = buildDocumentUrl(source);
                const label = source.label || source.sourceFile || `Nguồn ${index + 1}`;

                return (
                  <details key={`${label}-${index}`} className="source-item">
                    <summary>
                      {documentUrl ? (
                        <a
                          href={documentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="source-item-link"
                          style={{ color }}
                          onClick={(event) => event.stopPropagation()}
                        >
                          {label}
                        </a>
                      ) : (
                        <span className="source-item-link" style={{ color }}>{label}</span>
                      )}
                      {source.pageStart && (
                        <span style={{ color: 'var(--text-muted)', marginLeft: '0.35rem' }}>
                          tr. {source.pageStart}
                        </span>
                      )}
                    </summary>
                    {source.excerpt && (
                      <div className="source-excerpt">{source.excerpt}</div>
                    )}
                  </details>
                );
              })}
            </div>
          )}

          {/* Fallback text-embedded source */}
          {!isUser && sources.length === 0 && fallbackSource && (
            <div className="source-box" style={{ color }}>
              <span>{fallbackSource}</span>
            </div>
          )}
        </div>

        {/* User Avatar */}
        {isUser && (
          <div className="message-avatar message-avatar-user">
            🧑
          </div>
        )}
      </div>
    </div>
  );
}
