import React from 'react';

export default function TypingIndicator({ emoji }) {
  return (
    <div className="typing-indicator" aria-label="Nhân vật đang trả lời">
      <div className="chat-message__avatar" aria-hidden="true">{emoji}</div>
      <div className="typing-indicator__bubble">
        <div className="typing-indicator__dot" style={{ animationDelay: '0s' }} />
        <div className="typing-indicator__dot" style={{ animationDelay: '0.2s' }} />
        <div className="typing-indicator__dot" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
}
