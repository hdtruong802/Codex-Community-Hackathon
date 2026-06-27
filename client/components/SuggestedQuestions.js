import React from 'react';

export default function SuggestedQuestions({ questions, onSelect, color }) {
  if (!questions || questions.length === 0) return null;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    margin: '1rem 0'
  };

  const labelStyle = {
    fontSize: '0.72rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: 'var(--text-muted)'
  };

  const chipsContainerStyle = {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  };

  const chipStyle = (hovered) => ({
    background: hovered ? `${color}16` : 'var(--bg-card)',
    border: `1px solid ${hovered ? color : 'var(--border)'}`,
    color: hovered ? '#fff' : 'var(--text-secondary)',
    borderRadius: '8px',
    padding: '0.4rem 0.8rem',
    fontSize: '0.78rem',
    fontWeight: '500',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    lineHeight: '1.4'
  });

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>💡 Hỏi nhân vật:</span>
      <div style={chipsContainerStyle}>
        {questions.map((question, index) => (
          <QuestionChip
            key={index}
            text={question}
            onClick={() => onSelect(question)}
            styleFn={chipStyle}
          />
        ))}
      </div>
    </div>
  );
}

function QuestionChip({ text, onClick, styleFn }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={styleFn(hovered)}
    >
      {text}
    </button>
  );
}
