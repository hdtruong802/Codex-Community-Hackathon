import React, { useState } from 'react';

export default function CharacterCard({ character, onClick }) {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '14px',
    padding: '1.5rem',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
    borderColor: hovered ? character.color : 'var(--border)',
    boxShadow: hovered ? `0 0 25px ${character.color}18` : 'none'
  };

  const topBarStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: character.color
  };

  const emojiStyle = {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    display: 'inline-block',
    transition: 'transform 0.3s ease',
    transform: hovered ? 'scale(1.15) rotate(5deg)' : 'scale(1)'
  };

  const nameStyle = {
    fontSize: '1.25rem',
    fontWeight: '800',
    marginBottom: '0.25rem',
    color: 'var(--text-primary)'
  };

  const periodStyle = {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: character.color,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.75rem'
  };

  const bioStyle = {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
    marginBottom: '1.25rem'
  };

  const tagListStyle = {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap'
  };

  const tagStyle = {
    fontSize: '0.7rem',
    fontWeight: '600',
    padding: '0.2rem 0.6rem',
    borderRadius: '100px',
    background: `${character.color}12`,
    border: `1px solid ${character.color}25`,
    color: character.color
  };

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={topBarStyle} />
      <span style={emojiStyle}>{character.emoji}</span>
      <h3 style={nameStyle}>{character.name}</h3>
      <div style={periodStyle}>{character.period}</div>
      <p style={bioStyle}>{character.shortBio}</p>
      <div style={tagListStyle}>
        {character.topics.map((topic, i) => (
          <span key={i} style={tagStyle}>
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
