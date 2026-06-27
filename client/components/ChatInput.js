import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
    <form onSubmit={handleSubmit} className="chat-input">
      <Textarea
        ref={textareaRef}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="Nhập câu hỏi"
        className="min-h-10 max-h-[120px] resize-none border-0 bg-transparent px-0 py-2 text-[0.88rem] leading-snug text-foreground shadow-none focus-visible:border-transparent focus-visible:ring-0"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!text.trim() || disabled}
        aria-label="Gửi câu hỏi"
        title="Gửi câu hỏi"
      >
        <SendHorizontal />
      </Button>
    </form>
  );
}
