import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NotFoundCharacter({ onBack }) {
  return (
    <div className="container state-page">
      <Card className="state-card">
        <div className="state-card__icon" aria-hidden="true">?</div>
        <h1>Không tìm thấy nhân vật</h1>
        <p>
          Nhân vật này chưa có trong danh sách MVP hoặc backend chưa trả dữ liệu tương ứng. Bạn có thể quay lại gallery để chọn một nhân vật khác.
        </p>
        <Button onClick={onBack}>Về trang chủ</Button>
      </Card>
    </div>
  );
}
