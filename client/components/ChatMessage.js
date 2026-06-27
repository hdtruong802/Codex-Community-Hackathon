import React from 'react';
import SourceFactCheckBox from '@/components/SourceFactCheckBox';

export default function ChatMessage({ message, character }) {
  const isUser = message.role === 'user';

  return (
    <div className={`chat-message chat-message--${isUser ? 'user' : 'assistant'}`}>
      <div className="chat-message__row">
        {!isUser && <div className="chat-message__avatar" aria-hidden="true">{character?.emoji || '?'}</div>}
        <div
          className="chat-message__bubble"
          style={!isUser ? { '--character-color': character?.color || 'var(--accent-purple)' } : undefined}
        >
          <div className="chat-message__content">{message.content}</div>
          {!isUser ? (
            <SourceFactCheckBox sources={message.sources} color={character?.color || 'var(--accent-purple)'} />
          ) : null}
        </div>
        {isUser && <div className="chat-message__avatar" aria-hidden="true">T</div>}
      </div>
    </div>
  );
}
