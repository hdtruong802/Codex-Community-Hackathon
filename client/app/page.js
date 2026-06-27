"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CharacterCard from '@/components/CharacterCard';
import Disclaimer from '@/components/Disclaimer';
import { getCharacters } from '@/utils/api';

const STATIC_CHARACTERS = [
  {
    id: 'tran_hung_dao',
    name: 'Trần Hưng Đạo',
    emoji: '⚔️',
    period: 'Thế kỷ XIII · Nhà Trần',
    shortBio: 'Quốc công Tiết chế vĩ đại, người lãnh đạo quân dân Đại Việt 3 lần đánh bại quân xâm lược Nguyên-Mông hùng mạnh bậc nhất thế giới.',
    topics: ['Chiến thuật', 'Lãnh đạo', 'Hào khí Đông A'],
    color: '#ef4444'
  },
  {
    id: 'ly_thuong_kiet',
    name: 'Lý Thường Kiệt',
    emoji: '🏛️',
    period: 'Thế kỷ XI · Nhà Lý',
    shortBio: 'Thái úy danh tướng nhà Lý, người đánh bại đại quân nhà Tống xâm lược. Ông gắn liền với bài thơ Nam quốc sơn hà - tuyên ngôn độc lập đầu tiên.',
    topics: ['Nam quốc sơn hà', 'Tiên phát chế nhân', 'Phòng ngự sông Cầu'],
    color: '#10b981'
  },
  {
    id: 'nguyen_thi_binh',
    name: 'Nguyễn Thị Bình',
    emoji: '🕊️',
    period: 'Thế kỷ XX-XXI · Ngoại giao Việt Nam',
    shortBio: 'Nhà ngoại giao tiêu biểu của Việt Nam, Trưởng đoàn đàm phán Chính phủ Cách mạng lâm thời Cộng hòa miền Nam Việt Nam tại Hội nghị Paris, người ký Hiệp định Paris năm 1973.',
    topics: ['Hiệp định Paris', 'Ngoại giao', 'Hòa bình'],
    color: '#06b6d4'
  }
];

export default function Home() {
  const router = useRouter();
  const [characters, setCharacters] = useState(STATIC_CHARACTERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await getCharacters();
        if (data && data.length > 0) {
          setCharacters(data);
        }
      } catch (err) {
        console.warn('Could not fetch characters from backend, falling back to static data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCharacters();
  }, []);

  const handleSelectCharacter = (id) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div className="container" style={styles.container}>
      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>
          🏆 Track 3: IMPACT to Vietnam · Codex Community Hackathon 2026
        </div>
        <h1 style={styles.heroTitle}>
          Trò chuyện cùng <br />
          <span style={styles.purpleText}>Nhân vật Lịch sử</span> Việt Nam
        </h1>
        <p style={styles.heroSub}>
          Tìm hiểu nguồn cội dân tộc bằng cách đàm đạo với những nhân vật tiêu biểu trên các mặt trận quân sự, chủ quyền và ngoại giao qua mô phỏng trí tuệ nhân tạo.
        </p>
      </section>

      <Disclaimer />

      {/* CHARACTER GRID */}
      <div style={styles.gridHeader}>
        <h2 style={styles.gridTitle}>📜 Chọn nhân vật lịch sử</h2>
        <p style={styles.gridDesc}>Nhấp vào nhân vật để bắt đầu hành trình đàm đạo về giữ nước, chủ quyền và hòa bình.</p>
      </div>

      <div style={styles.grid}>
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onClick={() => handleSelectCharacter(char.id)}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    paddingBottom: '3.5rem'
  },
  hero: {
    padding: '3rem 0 1.5rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
  },
  heroBadge: {
    display: 'inline-flex',
    padding: '0.35rem 1rem',
    borderRadius: '100px',
    background: 'rgba(139, 92, 246, 0.08)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    fontSize: '0.78rem',
    fontWeight: '600',
    color: 'var(--accent-purple)',
    marginBottom: '0.5rem'
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '900',
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
    color: 'var(--text-primary)'
  },
  purpleText: {
    background: 'var(--gradient-main)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  heroSub: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    maxWidth: '650px',
    margin: '0 auto',
    lineHeight: '1.6'
  },
  gridHeader: {
    marginTop: '2rem',
    marginBottom: '1.5rem'
  },
  gridTitle: {
    fontSize: '1.5rem',
    fontWeight: '800',
    letterSpacing: '-0.01em',
    marginBottom: '0.25rem'
  },
  gridDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.25rem',
    marginTop: '1rem'
  }
};
