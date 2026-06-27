import React from 'react';
import { Button } from '@/components/ui/button';

export default function SuggestedQuestions({ questions, onSelect, color, disabled = false }) {
  if (!questions || questions.length === 0) return null;

  return (
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
        ))}
      </div>
    </div>
  );
}
