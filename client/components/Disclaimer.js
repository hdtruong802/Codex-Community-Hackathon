import React from 'react';

export default function Disclaimer() {
  return (
    <div style={styles.alert}>
      <span style={styles.icon}>⚠️</span>
      <div>
        <strong>Lưu ý quan trọng:</strong> Đây là cuộc đối thoại giả lập bằng trí tuệ nhân tạo (AI). Phản hồi từ nhân vật mang tính chất mô phỏng tính cách, văn phong và dữ kiện lịch sử để tăng tính tiếp cận giáo dục, không thay thế cho các nguồn sử liệu chính thống của quốc gia.
      </div>
    </div>
  );
}

const styles = {
  alert: {
    padding: '0.9rem 1.1rem',
    borderRadius: '10px',
    margin: '1.25rem 0',
    fontSize: '0.8rem',
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
    background: 'rgba(245, 158, 11, 0.08)',
    border: '1px solid rgba(245, 158, 11, 0.2)',
    color: '#f59e0b',
    lineHeight: '1.5',
    animation: 'fadeInUp 0.5s ease'
  },
  icon: {
    fontSize: '1.1rem',
    flexShrink: 0,
    marginTop: '0.1rem'
  }
};
