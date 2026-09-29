"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDict } from "@/data/dict";
import { localePath, type Locale } from "@/lib/i18n";
import { ChevronIcon } from "./Icons";
import { KakaoButton } from "./Kakao";

// ⚠ 현재 사진은 228px / 258px 저해상도. 원본(가로 1920px 이상) 수급 시 교체
const SLIDE_SRC = ["/images/hero-1.png", "/images/hero-2.png"];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroCarousel({ locale }: { locale: Locale }) {
  const t = getDict(locale).hero;
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const n = SLIDE_SRC.length;

  useEffect(() => {
    if (!auto || n < 2 || prefersReducedMotion()) return;
    const timer = window.setInterval(() => setIdx((i) => (i + 1) % n), 5000);
    return () => window.clearInterval(timer);
  }, [auto, n]);

  const go = (d: number) => {
    setAuto(false);
    setIdx((i) => (i + d + n) % n);
  };

  return (
    <section className="hero" role="region" aria-roledescription="carousel" aria-label={t.aria}>
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
      <div className="hero__scrim" />
      <div className="container hero__content">
        <p className="hero__eyebrow">{t.eyebrow}</p>
        <h1 className="hero__title">
          <span className={t.keepTogether ? "nowrap" : undefined}>{t.title[0]}</span>{" "}
          <span className={t.keepTogether ? "nowrap" : undefined}>{t.title[1]}</span>
        </h1>
        <p className="hero__desc">{t.desc}</p>
        <div className="hero__actions">
          <KakaoButton className="btn btn--kakao btn--hero">{t.ctaKakao}</KakaoButton>
          <Link href={localePath(locale, "/academics/")} className="btn btn--white btn--hero">
            {t.ctaAcademics}
          </Link>
        </div>
      </div>
      {n > 1 && (
        <div className="container hero__controls">
          <button type="button" className="hero__arrow" onClick={() => go(-1)} aria-label={t.prev}>
            <ChevronIcon dir="left" />
          </button>
          <span aria-live="polite">
            {idx + 1} / {n}
          </span>
          <button type="button" className="hero__arrow" onClick={() => go(1)} aria-label={t.next}>
            <ChevronIcon />
          </button>
        </div>
      )}
    </section>
  );
}
