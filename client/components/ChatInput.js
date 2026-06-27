import React, { useState, useRef, useEffect } from 'react';

export default function ChatInput({ onSend, placeholder, disabled }) {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    // Auto-grow textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        style={styles.textarea}
      />
      <button
        type="submit"
        disabled={!text.trim() || disabled}
        style={styles.button(!text.trim() || disabled)}
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

const styles = {
  form: {
    display: 'flex',
    gap: '0.5rem',
    background: 'var(--bg-card-alt)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '0.5rem 0.75rem',
    alignItems: 'flex-end',
    width: '100%'
  },
  textarea: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: 'var(--text-primary)',
    fontSize: '0.88rem',
    fontFamily: 'inherit',
    resize: 'none',
    padding: '0.4rem 0',
    maxHeight: '120px',
    lineHeight: '1.4'
  },
  button: (disabled) => ({
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: disabled ? 'rgba(255, 255, 255, 0.05)' : 'var(--accent-purple)',
    border: 'none',
    color: disabled ? 'var(--text-muted)' : '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    flexShrink: 0,
    marginBottom: '2px'
  })
};
