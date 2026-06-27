"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CharacterCard from '@/components/CharacterCard';
import Disclaimer from '@/components/Disclaimer';
import { getCharacters } from '@/utils/api';
import { STATIC_CHARACTERS } from '@/utils/mockData';

export default function Home() {
  const router = useRouter();
  const [characters, setCharacters] = useState(STATIC_CHARACTERS);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await getCharacters();
        if (data && data.length > 0) {
          setCharacters(data);
          setUsingFallback(false);
        } else {
          setUsingFallback(true);
        }
      } catch (err) {
        console.warn('Could not fetch characters from backend, falling back to static data:', err);
        setUsingFallback(true);
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
    <div className="container home-page">
      <section className="home-hero">
        <div className="home-hero__eyebrow">
          Track 3: IMPACT to Vietnam · Codex Community Hackathon 2026
        </div>
        <h1 className="home-hero__title">
          Trò chuyện cùng <span className="home-hero__accent">nhân vật lịch sử</span> Việt Nam
        </h1>
        <p className="home-hero__copy">
          Tìm hiểu nguồn cội dân tộc bằng cách đàm đạo với những nhân vật tiêu biểu trên các mặt trận quân sự, chủ quyền và ngoại giao qua mô phỏng trí tuệ nhân tạo.
        </p>
      </section>

      <Disclaimer />

      <div className="home-grid-header">
        <h2>Chọn nhân vật lịch sử</h2>
        <p>
          {loading
            ? 'Đang tải danh sách nhân vật...'
            : usingFallback
              ? 'Đang dùng dữ liệu mẫu để demo vẫn chạy khi backend chưa sẵn sàng.'
              : 'Nhấp vào nhân vật để bắt đầu hành trình đàm đạo về giữ nước, chủ quyền và hòa bình.'}
        </p>
      </div>

      <div className="character-grid" aria-busy={loading}>
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
