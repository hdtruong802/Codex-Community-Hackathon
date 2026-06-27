import React from 'react';

// Character portrait mappings
const PORTRAITS = {
  tran_hung_dao: '/characters/tran_hung_dao.png',
  ly_thuong_kiet: '/characters/ly_thuong_kiet.png',
  ho_xuan_huong: '/characters/ho_xuan_huong.png'
};

export default function CharacterCard({ character, onClick }) {
  const portrait = PORTRAITS[character.id];
  const color = character.color || '#8b5cf6';

  return (
    <div
      className="character-card"
      onClick={onClick}
      style={{ '--card-color': color }}
    >
      {/* Ambient glow behind card */}
      <div
        className="card-glow"
        style={{ background: `${color}15` }}
      />

      {/* Animated border glow */}
      <div className="card-border-glow" />

      <div className="card-inner">
        {/* Portrait */}
        <div className="card-portrait">
          {portrait ? (
            <img
              src={portrait}
              alt={`Chân dung ${character.name}`}
              loading="eager"
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              background: `linear-gradient(135deg, ${color}15, ${color}08)`
            }}>
              {character.emoji}
            </div>
          )}
          <div className="card-portrait-overlay" />
          <span className="card-portrait-emoji">{character.emoji}</span>
          <div className="card-ai-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Ảnh phục dựng bằng AI
          </div>
        </div>

        {/* Card body */}
        <div className="card-body">
          <h3 className="card-name">{character.name}</h3>
          <div className="card-period" style={{ color }}>{character.period}</div>
          <p className="card-bio">{character.shortBio}</p>

          {/* Topic tags */}
          <div className="card-tags">
            {character.topics.map((topic, i) => (
              <span
                key={i}
                className="card-tag"
                style={{
                  background: `${color}0d`,
                  border: `1px solid ${color}20`,
                  color: color
                }}
              >
                {topic}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <button
            className="card-cta"
            style={{ background: `${color}18`, color }}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            Trò chuyện
            <span className="card-cta-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
