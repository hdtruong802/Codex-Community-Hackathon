"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    id: 'ho_xuan_huong',
    name: 'Hồ Xuân Hương',
    emoji: '🌸',
    period: 'Thế kỷ XVIII-XIX · Lê Trung Hưng - Nguyễn',
    shortBio: 'Nữ sĩ tài hoa được mệnh danh là "Bà chúa thơ Nôm", nổi bật với thơ Nôm trào phúng, sắc sảo, bênh vực thân phận và khát vọng sống của người phụ nữ.',
    topics: ['Thơ Nôm', 'Trào phúng', 'Quyền phụ nữ'],
    color: '#ec4899'
  }
];

// Floating particle system
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const particles = [];
    const COUNT = 50;
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.15,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        hue: Math.random() > 0.5 ? 260 : 220 // purple or blue
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Subtle flicker
        const flicker = Math.sin(Date.now() * 0.001 + p.x * 0.01) * 0.1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.opacity + flicker})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${(p.opacity + flicker) * 0.15})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
}

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

  const handleSelectCharacter = useCallback((id) => {
    router.push(`/chat/${id}`);
  }, [router]);

  return (
    <>
      <ParticleCanvas />
      <div className="container" style={{ paddingBottom: '3rem' }}>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Track 3: IMPACT to Vietnam · Codex Community Hackathon 2026
          </div>

          <h1 className="hero-title">
            Trò chuyện cùng{' '}
            <span className="hero-title-highlight">Nhân vật Lịch sử</span>{' '}
            Việt Nam
          </h1>

          <p className="hero-subtitle">
            Tìm hiểu nguồn cội dân tộc bằng cách đàm đạo với những nhân vật tiêu biểu
            trên các mặt trận quân sự, chủ quyền và văn học qua mô phỏng trí tuệ nhân tạo.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">3</span>
              <span className="hero-stat-label">Nhân vật</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">AI</span>
              <span className="hero-stat-label">Trí tuệ nhân tạo</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">RAG</span>
              <span className="hero-stat-label">Sử liệu chính xác</span>
            </div>
          </div>
        </section>

        <Disclaimer />

        {/* SECTION HEADER */}
        <div className="section-header">
          <h2 className="section-title">📜 Chọn nhân vật lịch sử</h2>
          <p className="section-desc">
            Nhấp vào nhân vật để bắt đầu hành trình đàm đạo về giữ nước, chủ quyền và văn chương.
          </p>
        </div>

        {/* CHARACTER GRID */}
        <div className="character-grid">
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              onClick={() => handleSelectCharacter(char.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
