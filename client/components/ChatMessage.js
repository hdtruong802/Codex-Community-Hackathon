import React from 'react';

export default function ChatMessage({ message, character }) {
  const isUser = message.role === 'user';

  // Parse message content to separate body from the historical source references
  const parseContent = (text) => {
    if (!text) return { content: '', source: null };
    const marker = '📚';
    if (text.includes(marker)) {
      const parts = text.split(marker);
      return {
        content: parts[0].trim(),
        source: marker + ' ' + parts[1].trim()
      };
    }
    return { content: text, source: null };
  };

  const { content, source } = parseContent(message.content);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: isUser ? 'flex-end' : 'flex-start',
    marginBottom: '1rem',
    width: '100%',
    animation: 'fadeInUp 0.3s ease'
  };

  const wrapperStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    maxWidth: '80%'
  };

  const avatarStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: isUser ? 'rgba(59, 130, 246, 0.1)' : `${character?.color || '#8b5cf6'}12`,
    border: `1px solid ${isUser ? 'rgba(59, 130, 246, 0.2)' : `${character?.color || '#8b5cf6'}25`}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    flexShrink: 0
  };

  const bubbleStyle = {
    background: isUser ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg-card)',
    border: `1px solid ${isUser ? 'rgba(59, 130, 246, 0.2)' : 'var(--border)'}`,
    borderRadius: '12px',
    borderTopLeftRadius: isUser ? '12px' : '2px',
    borderTopRightRadius: isUser ? '2px' : '12px',
    padding: '0.8rem 1rem',
    color: 'var(--text-primary)',
    fontSize: '0.88rem',
    lineHeight: '1.5',
    wordBreak: 'break-word',
    boxShadow: !isUser ? 'var(--shadow-glow)' : 'none'
  };

  const contentStyle = {
    whiteSpace: 'pre-wrap'
  };

  const sourceBoxStyle = {
    marginTop: '0.75rem',
    paddingTop: '0.6rem',
    borderTop: '1px dashed var(--border)',
    fontSize: '0.75rem',
    color: character?.color || 'var(--accent-purple)',
    fontStyle: 'italic',
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem'
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        {!isUser && <div style={avatarStyle}>{character?.emoji || '👤'}</div>}
        <div style={bubbleStyle}>
          <div style={contentStyle}>{content}</div>
          {source && (
            <div style={sourceBoxStyle}>
              <span>{source}</span>
            </div>
          )}
        </div>
        {isUser && <div style={avatarStyle}>🧑</div>}
      </div>
    </div>
  );
}
