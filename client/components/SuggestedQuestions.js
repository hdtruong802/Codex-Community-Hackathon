import React from 'react';
import { Button } from '@/components/ui/button';

export default function SuggestedQuestions({ questions, onSelect, color, disabled = false }) {
  if (!questions || questions.length === 0) return null;

  return (
<<<<<<< HEAD
    <div className="suggested-questions">
      <span className="suggested-questions__label">Gợi ý câu hỏi</span>
      <div className="chip-row">
        {questions.map((question) => (
          <Button
            key={question}
            variant="outline"
            size="sm"
            className="suggested-questions__chip"
            disabled={disabled}
            onClick={() => onSelect(question)}
            style={{
              borderColor: `${color}35`,
              color: 'var(--text-secondary)'
            }}
          >
            {question}
          </Button>
=======
    <div className="suggested-container">
      <span className="suggested-label">
        💡 Hỏi nhân vật:
      </span>
      <div className="suggested-chips">
        {questions.map((question, index) => (
          <button
            key={index}
            className="suggested-chip"
            onClick={() => onSelect(question)}
            style={{
              animationDelay: `${index * 0.08}s`
            }}
          >
            {question}
          </button>
>>>>>>> main
        ))}
      </div>
    </div>
  );
}
