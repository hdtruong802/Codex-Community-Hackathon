import React from 'react';
import { Badge } from '@/components/ui/badge';

const confidenceLabel = {
  high: 'Cao',
  medium: 'Trung bình',
  low: 'Thấp'
};

export default function SourceFactCheckBox({ sources, color }) {
  const validSources = (sources || []).filter((source) => source?.source);

  if (validSources.length === 0) return null;

  return (
    <div className="source-box">
      <div className="source-box__title">Nguồn / kiểm chứng từ backend</div>
      <div className="source-box__list">
        {validSources.map((item, index) => (
          <div className="source-box__item" key={`${item.source}-${index}`}>
            <div className="source-box__source">{item.source}</div>
            <div className="source-box__meta">
              {item.topic ? (
                <Badge style={{ color, borderColor: `${color}35`, background: `${color}10` }}>
                  {item.topic}
                </Badge>
              ) : null}
              {item.timePeriod ? (
                <Badge>{item.timePeriod}</Badge>
              ) : null}
              {item.confidence ? (
                <Badge>Độ tin cậy: {confidenceLabel[item.confidence] || item.confidence}</Badge>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
