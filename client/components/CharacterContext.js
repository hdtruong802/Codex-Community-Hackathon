import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CharacterContext({ character, onReset }) {
  const achievements = character.achievements || character.topics || [];

  return (
    <Card
      className="character-context"
      style={{ '--character-color': character.color }}
    >
      <CardContent className="character-context__content">
        <div className="character-context__emoji" aria-hidden="true">{character.emoji}</div>
        <h2 className="character-context__name">{character.name}</h2>
        <div className="character-context__period">{character.period}</div>
        <p className="character-context__bio">{character.shortBio}</p>

        <div className="character-context__section">
          <div className="context-label">Chủ đề chính</div>
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
        </div>

        {achievements.length > 0 ? (
          <div className="character-context__section">
            <div className="context-label">Nên khai thác khi hỏi</div>
            <ul className="achievement-list">
              {achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="character-context__section">
          <Button
            variant="destructive"
            className="w-full"
            onClick={onReset}
            aria-label="Xóa hội thoại"
            title="Xóa hội thoại"
          >
            Xóa hội thoại
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
