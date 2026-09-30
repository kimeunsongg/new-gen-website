"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getDict } from "@/data/dict";
import { localePath, type Locale } from "@/lib/i18n";
import { KakaoButton } from "./Kakao";
import Typewriter from "./Typewriter";

// ⚠ 현재 사진은 228px / 258px 저해상도. 원본(가로 1920px 이상) 수급 시 교체
const SLIDE_SRC = ["/images/hero-1.png", "/images/hero-2.png"];
const INTERVAL = 5000;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** 중앙대 메인 참고: 왼쪽 문구 패널 + 오른쪽 사진 슬라이드(캡션 + 진행 막대) */
export default function HeroCarousel({ locale }: { locale: Locale }) {
  const t = getDict(locale).hero;
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const [reduced, setReduced] = useState(false);
  const n = SLIDE_SRC.length;

  useEffect(() => setReduced(prefersReducedMotion()), []);

  // 슬라이드가 바뀔 때마다 타이머를 새로 걸어 진행 막대(5초)와 맞춤
  useEffect(() => {
    if (!auto || reduced || n < 2) return;
    const timer = window.setTimeout(() => setIdx((i) => (i + 1) % n), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [auto, reduced, idx, n]);

  // 헤더 리퀴드 글라스가 바뀐 사진을 다시 비추도록 알림 (슬라이드 전환 0.6s 뒤)
  useEffect(() => {
    const timer = window.setTimeout(() => window.dispatchEvent(new CustomEvent("hero:slide", { detail: idx })), 650);
    return () => window.clearTimeout(timer);
  }, [idx]);

  const playing = auto && !reduced && n > 1;

  // 왼쪽 칸 위에서 마우스를 움직이면 빛이 따라옴 (재렌더 없이 CSS 변수만 갱신)
  const gradRef = useRef<HTMLDivElement>(null);
  const followPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gradRef.current;
    if (!g || reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    g.style.setProperty("--mx", `${e.clientX - r.left}px`);
    g.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const resetPointer = () => {
    gradRef.current?.style.removeProperty("--mx");
    gradRef.current?.style.removeProperty("--my");
  };

  return (
    <section className="hero-split">
      <div className="hero-split__panel" onPointerMove={followPointer} onPointerLeave={resetPointer}>
        {/* 그라데이션 배경: PNG 바탕 + 천천히 흐르는 색 덩어리 + 마우스를 따라오는 빛 + 입자 질감 */}
        <div className="hero-gradient" aria-hidden="true" ref={gradRef}>
          <span className="hero-gradient__blob hero-gradient__blob--a" />
          <span className="hero-gradient__blob hero-gradient__blob--b" />
          <span className="hero-gradient__blob hero-gradient__blob--c" />
          <span className="hero-gradient__blob hero-gradient__blob--cursor" />
          <span className="hero-gradient__grain" />
        </div>
        <div className="hero-split__text">
          <p className="hero-split__eyebrow">{t.eyebrow}</p>
          <h1 className="hero-split__title">
            <Typewriter lines={t.title} />
          </h1>
          <p className="hero-split__desc">{t.desc}</p>
          <div className="hero__actions">
            <KakaoButton className="btn btn--kakao btn--hero">{t.ctaKakao}</KakaoButton>
            <Link href={localePath(locale, "/academics/")} className="btn btn--outline btn--hero">
              {t.ctaAcademics}
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-split__media" role="region" aria-roledescription="carousel" aria-label={t.aria}>
        <div className="hero__track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {SLIDE_SRC.map((src, i) => (
            <div
              key={src}
              className="hero__slide"
              role="img"
              aria-label={t.slides[i]}
              aria-hidden={i !== idx}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
        <div className="hero-split__shade" />
        <div className="hero-split__caption" aria-live="polite">
          {t.captions.map((c, i) => (
            <p key={c} className={i === idx ? "is-active" : undefined} aria-hidden={i !== idx}>
              {c}
            </p>
          ))}
        </div>
        {n > 1 && (
          <div className="hero-split__bars">
            {SLIDE_SRC.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`hero-split__bar${i === idx ? " is-active" : ""}${i === idx && playing ? " is-playing" : ""}`}
                aria-label={t.goTo(i + 1)}
                aria-current={i === idx ? "true" : undefined}
                onClick={() => {
                  setAuto(false);
                  setIdx(i);
                }}
              >
                {/* key로 슬라이드마다 애니메이션을 처음부터 다시 */}
                <span key={`${idx}-${playing}`} style={{ animationDuration: `${INTERVAL}ms` }} />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
