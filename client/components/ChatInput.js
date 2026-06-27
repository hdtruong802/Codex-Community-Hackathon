import React, { useRef, useEffect } from 'react';

export default function ChatInput({ onSend, placeholder, disabled, characterColor }) {
  const textareaRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = textareaRef.current?.value?.trim();
    if (!text || disabled) return;
    onSend(text);
    textareaRef.current.value = '';
    // Reset height
    textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = () => {
    // Auto-grow textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="input-form">
      <textarea
        ref={textareaRef}
        rows={1}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className="input-textarea"
      />
      <button
        type="submit"
        disabled={disabled}
        className="input-send-btn"
        style={
          !disabled && characterColor
            ? { background: characterColor }
            : undefined
        }
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  );
}
