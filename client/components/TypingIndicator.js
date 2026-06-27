import React from 'react';

export default function TypingIndicator({ emoji }) {
  return (
    <div style={styles.container}>
      <div style={styles.avatar}>{emoji}</div>
      <div style={styles.bubble}>
        <div style={{ ...styles.dot, animationDelay: '0s' }}></div>
        <div style={{ ...styles.dot, animationDelay: '0.2s' }}></div>
        <div style={{ ...styles.dot, animationDelay: '0.4s' }}></div>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    marginBottom: '1rem',
    alignSelf: 'flex-start',
    animation: 'fadeIn 0.3s ease'
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'rgba(139, 92, 246, 0.1)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    flexShrink: 0
  },
  bubble: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    borderTopLeftRadius: '2px',
    padding: '0.8rem 1rem',
    display: 'flex',
    gap: '0.35rem',
    alignItems: 'center',
    minHeight: '38px'
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: 'var(--text-muted)',
    animation: 'bounce 1.2s infinite ease-in-out'
  }
};
