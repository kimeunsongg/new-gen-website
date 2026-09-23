"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronIcon } from "./Icons";
import { KakaoButton } from "./Kakao";

// ⚠ 현재 사진은 228px / 258px 저해상도. 원본(가로 1920px 이상) 수급 시 교체
const SLIDES: { src?: string; alt: string }[] = [
  { src: "/images/hero-1.png", alt: "학생이 마을 아이들에게 활동 자료를 보여 주는 모습" },
  { src: "/images/hero-2.png", alt: "교실에서 수업 중인 학생들" },
];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const n = SLIDES.length;

  useEffect(() => {
    if (!auto || n < 2 || prefersReducedMotion()) return;
    const t = window.setInterval(() => setIdx((i) => (i + 1) % n), 5000);
    return () => window.clearInterval(t);
  }, [auto, n]);

  const go = (d: number) => {
    setAuto(false);
    setIdx((i) => (i + d + n) % n);
  };

  return (
    <section className="hero" role="region" aria-roledescription="carousel" aria-label="학교 활동 사진">
      <div className="hero__track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className="hero__slide"
            role="img"
            aria-label={s.alt}
            aria-hidden={i !== idx}
            style={s.src ? { backgroundImage: `url(${s.src})` } : undefined}
          />
        ))}
      </div>
      <div className="hero__scrim" />
      <div className="container hero__content">
        <p className="hero__eyebrow">전남 여수 · 기독교 대안학교</p>
        <h1 className="hero__title">
          <span className="nowrap">천권독서로 &apos;꿈&apos;과 &apos;꿈너머꿈&apos;을</span>{" "}
          <span className="nowrap">꾸는 교육 공동체</span>
        </h1>
        <p className="hero__desc">&apos;꿈&apos;과 &apos;꿈너머꿈&apos;을 실현하여 소금과 빛이 되는 인재를 양성합니다.</p>
        <div className="hero__actions">
          <KakaoButton className="btn btn--kakao btn--hero">카카오톡 입학 상담</KakaoButton>
          <Link href="/academics/" className="btn btn--white btn--hero">
            교육과정 보기
          </Link>
        </div>
      </div>
      {n > 1 && (
        <div className="container hero__controls">
          <button type="button" className="hero__arrow" onClick={() => go(-1)} aria-label="이전 사진">
            <ChevronIcon dir="left" />
          </button>
          <span aria-live="polite">
            {idx + 1} / {n}
          </span>
          <button type="button" className="hero__arrow" onClick={() => go(1)} aria-label="다음 사진">
            <ChevronIcon />
          </button>
        </div>
      )}
    </section>
  );
}
