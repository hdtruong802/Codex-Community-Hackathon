import React from 'react';

export default function SuggestedQuestions({ questions, onSelect, color }) {
  if (!questions || questions.length === 0) return null;

  return (
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
        ))}
      </div>
    </div>
  );
}
