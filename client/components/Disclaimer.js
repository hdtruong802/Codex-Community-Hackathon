import React from 'react';
import { CircleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Disclaimer() {
  return (
    <Alert className="border-amber-500/25 bg-amber-500/10 text-amber-200">
      <CircleAlert className="size-4" />
      <AlertTitle>Lưu ý quan trọng</AlertTitle>
      <AlertDescription className="text-amber-100/85">
        Đây là cuộc đối thoại giả lập bằng trí tuệ nhân tạo (AI). Phản hồi từ nhân vật mang tính chất mô phỏng tính cách, văn phong và dữ kiện lịch sử để tăng tính tiếp cận giáo dục, không thay thế cho các nguồn sử liệu chính thống của quốc gia.
      </AlertDescription>
    </Alert>
  );
}
