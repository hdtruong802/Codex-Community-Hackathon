import React from 'react';

const PORTRAITS = {
  tran_hung_dao: '/characters/tran_hung_dao.png',
  ly_thuong_kiet: '/characters/ly_thuong_kiet.png',
  ho_xuan_huong: '/characters/ho_xuan_huong.png'
};

export default function TypingIndicator({ emoji, characterId }) {
  const portrait = characterId ? PORTRAITS[characterId] : null;

  return (
<<<<<<< HEAD
    <div className="typing-indicator" aria-label="Nhân vật đang trả lời">
      <div className="chat-message__avatar" aria-hidden="true">{emoji}</div>
      <div className="typing-indicator__bubble">
        <div className="typing-indicator__dot" style={{ animationDelay: '0s' }} />
        <div className="typing-indicator__dot" style={{ animationDelay: '0.2s' }} />
        <div className="typing-indicator__dot" style={{ animationDelay: '0.4s' }} />
=======
    <div className="typing-container">
      <div className="typing-avatar">
        {portrait ? (
          <img src={portrait} alt="" />
        ) : (
          emoji || '👤'
        )}
      </div>
      <div className="typing-bubble">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
>>>>>>> main
      </div>
    </div>
  );
}
