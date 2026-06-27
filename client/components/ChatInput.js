<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
=======
import React, { useRef, useEffect } from 'react';
>>>>>>> main

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
<<<<<<< HEAD
    <form onSubmit={handleSubmit} className="chat-input">
      <Textarea
=======
    <form ref={formRef} onSubmit={handleSubmit} className="input-form">
      <textarea
>>>>>>> main
        ref={textareaRef}
        rows={1}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
<<<<<<< HEAD
        aria-label="Nhập câu hỏi"
        className="min-h-10 max-h-[120px] resize-none border-0 bg-transparent px-0 py-2 text-[0.88rem] leading-snug text-foreground shadow-none focus-visible:border-transparent focus-visible:ring-0"
=======
        className="input-textarea"
>>>>>>> main
      />
      <Button
        type="submit"
<<<<<<< HEAD
        size="icon"
        disabled={!text.trim() || disabled}
        aria-label="Gửi câu hỏi"
        title="Gửi câu hỏi"
=======
        disabled={disabled}
        className="input-send-btn"
        style={
          !disabled && characterColor
            ? { background: characterColor }
            : undefined
        }
>>>>>>> main
      >
        <SendHorizontal />
      </Button>
    </form>
  );
}
