import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function CharacterCard({ character, onClick }) {
  const cssVars = {
    '--character-color': character.color,
    '--character-glow': `${character.color}18`
  };

  return (
    <Card
      className="character-card"
      style={cssVars}
      role="button"
      tabIndex={0}
      aria-label={`Trò chuyện với ${character.name}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <div className="character-card__bar" />
      <span className="character-card__emoji" aria-hidden="true">{character.emoji}</span>
      <h3 className="character-card__name">{character.name}</h3>
      <div className="character-card__period">{character.period}</div>
      <p className="character-card__bio">{character.shortBio}</p>
      <div className="chip-row">
        {(character.topics || []).map((topic) => (
          <Badge
            key={topic}
            style={{
              color: character.color,
              borderColor: `${character.color}35`,
              background: `${character.color}12`
            }}
          >
            {topic}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
