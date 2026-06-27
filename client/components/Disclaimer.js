import React from 'react';
import { CircleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Disclaimer() {
  return (
    <Alert className="border-amber-300 bg-amber-50 text-amber-950">
      <CircleAlert className="size-4" />
      <AlertTitle>Lưu ý quan trọng</AlertTitle>
      <AlertDescription className="text-amber-900/85">
        Đây là cuộc đối thoại giả lập bằng trí tuệ nhân tạo (AI). Phản hồi từ nhân vật mang tính chất mô phỏng tính cách, văn phong và dữ kiện lịch sử để tăng tính tiếp cận giáo dục, không thay thế cho các nguồn sử liệu chính thống của quốc gia.
      </AlertDescription>
    </Alert>
  );
}
